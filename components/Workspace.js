import { default as React, Component } from "react";
import { default as SplitPane } from "react-split-pane";
import { default as styled } from "styled-components";
import * as Px from "polynomic";

import { default as WorkspacePreview } from "./WorkspacePreview";

import { default as Bar } from "../ui/Bar";
import { default as Editor } from "../ui/Editor";

const Container = styled.div`
  overflow: hidden;
  height: 100vh;
  display: flex;
  flex-direction: column;
`;

const Main = styled.div`
  position: relative;
  flex: 1;
`;

const parser = new DOMParser();

const getPathElementsFromDocument = doc =>
  parser
    .parseFromString(`<svg>${doc}</svg>`, "image/svg+xml")
    .querySelectorAll("path");

const getPathsFromDocument = doc => {
  const elements = getPathElementsFromDocument(doc);
  const paths = [];

  for (const element of elements) {
    paths.push(Px.from(element.getAttribute("d")));
  }

  return paths;
};

const initialDocument = `<g>
  <path d="M160.227,178.5186 L187.857,178.5186 L143.75,64.0486 L113.201,64.0486 L69.094,178.5186 L96.726,178.5186 L103.934,159.1286 L145.609,159.1286 L138.065,137.6726 L110.625,137.6726 L128.475,88.4186 L160.227,178.5186 Z M251.339,93.768 C250.357,90.232 246.705,88.155 243.154,89.141 C239.617,90.123 237.544,93.787 238.526,97.324 C241.299,107.309 242.704,117.63 242.704,128 C242.704,191.248 191.248,242.702 128,242.702 C64.752,242.702 13.297,191.248 13.297,128 C13.297,64.751 64.752,13.296 128,13.296 C154.793,13.296 180.718,22.814 201.179,39.752 C200.383,41.652 199.941,43.737 199.941,45.925 C199.941,54.76 207.103,61.922 215.938,61.922 C224.773,61.922 231.935,54.76 231.935,45.925 C231.935,37.09 224.773,29.928 215.938,29.928 C214.237,29.928 212.6,30.199 211.062,30.691 C188.022,11.056 158.513,0 128,0 C57.421,0 0,57.42 0,128 C0,198.579 57.421,255.999 128,255.999 C198.579,255.999 256,198.579 256,128 C256,116.428 254.433,104.91 251.339,93.768 Z" fill="#112B49"></path>
</g>`;

class Workspace extends Component {
  state = {
    document: initialDocument,
    paths: [],
    selected: {},
    viewport: { width: 0, height: 0 },
  };

  constructor(props) {
    super(props);

    this.controllerRef = React.createRef();

    // The current CodeMirror editor instance
    this.editor = null;

    // The pathstrings and segments locations in the editor
    this.pathRanges = [];

    // The highlighted segments editor markers
    this.markers = [];
  }

  componentDidMount() {
    // Size the viewport of the preview
    this.resize();

    // ...
    this.editor.setValue(this.state.document);
    this.setState({ paths: getPathsFromDocument(this.state.document) });
    this.updatePathRanges();

    window.addEventListener("resize", this.resize);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.resize);
  }

  resize = () => {
    const bounds = this.controllerRef.current.getBoundingClientRect();

    this.setState({
      viewport: {
        width: bounds.width,
        height: bounds.height,
      },
    });
  };

  /**
   * Update path and segments positions in the editor; they will be used to
   * manipulate substrings in the editor (for example highlight segments)
   */
  updatePathRanges = () => {
    // Step 1: locate pathstrings
    const pathRanges = [],
      pathCursor = this.editor.getSearchCursor(/(path.* d=")([^"]*)(")/);

    let pathMatch;
    while ((pathMatch = pathCursor.findNext())) {
      const [, prefix, , suffix] = pathMatch,
        from = pathCursor.from(),
        to = pathCursor.to(),
        pathStart = { line: from.line, ch: from.ch + prefix.length },
        pathEnd = { line: to.line, ch: to.ch - suffix.length };

      // Step 2: for each pathstring, locate segments
      const segRanges = [],
        segCursor = this.editor.getSearchCursor(
          /([MLHVQTCSAZmlhvqtcsaz])[Ee\d\s.,+-]*/,
          pathStart,
        );

      let segMatch;
      while ((segMatch = segCursor.findNext())) {
        const from = segCursor.from(),
          to = segCursor.to(),
          segStart = { line: from.line, ch: from.ch },
          segEnd = { line: to.line, ch: to.ch };

        if (segStart.line > pathEnd.line || segStart.ch > pathEnd.ch) {
          // If we get out the pathstring, stop there
          break;
        }

        segRanges.push({ from: segStart, to: segEnd });
      }

      pathRanges.push({
        from: pathStart,
        to: pathEnd,
        segRanges,
      });
    }

    this.pathRanges = pathRanges;
  };

  /**
   * Retrieve the selected segments from editor selections and pathstring ranges
   */
  getSelectedFromSelections = (selections, pathRanges) => {
    const selected = {};

    selections.forEach(({ anchor, head }) => {
      if (anchor.line !== head.line || anchor.ch !== head.ch) {
        // Process only if the selection actually wraps something
        // Step 1: retrieve the path ranges in which the current selection is present
        const pathIndex = pathRanges.findIndex(
          ({ from, to }) =>
            anchor.line >= from.line &&
            anchor.ch >= from.ch &&
            head.line <= to.line &&
            head.ch <= to.ch,
        );

        if (pathIndex >= 0) {
          // If the current selection is actually located in a pathstring, let's
          // look for the selected segments
          const segIndices = pathRanges[pathIndex].segRanges.reduce(
            (acc, { from, to }, index) => {
              if (
                (from.ch >= anchor.ch && from.ch < head.ch) ||
                (to.ch > anchor.ch && to.ch <= head.ch) ||
                (from.ch <= anchor.ch && to.ch >= head.ch)
              ) {
                acc.push(index);
              }

              return acc;
            },
            [],
          );

          if (selected[pathIndex]) {
            // There already have been segments selected in this pathstring, so
            // push the new ones in it
            selected[pathIndex].push(...segIndices);
          } else {
            // No segments have already been selected in this pathstring, so
            // create a new entry in the map
            selected[pathIndex] = segIndices;
          }
        }
      }
    });

    return selected;
  };

  /**
   * Retrieve the editor selections from selected segments and pathstring ranges
   */
  getSelectionsFromSelected = (selected, pathRanges) => {
    const selections = [];

    for (const pathIndex in selected) {
      for (const segIndex of selected[pathIndex]) {
        selections.push({
          anchor: pathRanges[pathIndex].segRanges[segIndex].from,
          head: pathRanges[pathIndex].segRanges[segIndex].to,
        });
      }
    }

    return selections;
  };

  /**
   * Set the paths
   */
  setPaths = paths => {
    // Replace corresponding pathstrings in the editor
    this.pathRanges.forEach(({ from, to }, index) => {
      this.editor.replaceRange(
        Px.renderPathstring(paths[index]),
        from,
        to,
        "preview",
      );
    });

    // Update the document state and paths
    this.setState({ document: this.editor.getValue(), paths });

    // Update pathstring editor ranges
    this.updatePathRanges();
  };

  /**
   * Set the selected segments and update editor selections
   */
  setSelected = selected => {
    this.setState({ selected }, () => {
      this.editor.setSelections(
        this.getSelectionsFromSelected(this.state.selected, this.pathRanges),
      );
    });
  };

  /**
   * Check that a segment is selected
   */
  isSelected = (pathIndex, segIndex) =>
    this.state.selected[pathIndex] &&
    this.state.selected[pathIndex].includes(segIndex);

  /**
   * Add a new segment to the selection
   */
  addSelected = (pathIndex, segIndex) => {
    if (this.state.selected[pathIndex]) {
      if (!this.state.selected[pathIndex].includes(segIndex)) {
        // Add a new selected segment to the existing selected path
        this.setSelected({
          ...this.state.selected,
          [pathIndex]: [...this.state.selected[pathIndex], segIndex],
        });
      }
    } else {
      // Add a new selected segment to a new selected path
      this.setSelected({
        ...this.state.selected,
        [pathIndex]: [segIndex],
      });
    }
  };

  /**
   * Remove a segment from the selection
   */
  removeSelected = (pathIndex, segIndex) => {
    if (this.isSelected(pathIndex, segIndex)) {
      // Remove the selected segment
      this.setSelected({
        ...this.state.selected,
        [pathIndex]: this.state.selected[pathIndex].filter(
          _index => _index !== segIndex,
        ),
      });
    }
  };

  setHighlights = selected => {
    this.clearHighlights();

    const markers = [];

    for (const pathIndex in selected) {
      for (const segIndex of selected[pathIndex]) {
        const { from, to } = this.pathRanges[pathIndex].segRanges[segIndex];
        const marker = this.editor.markText(from, to, {
          className: "cm-seg-hovered",
        });

        markers.push(marker);
      }
    }

    this.markers = markers;
  };

  clearHighlights = () => {
    this.markers.forEach(marker => marker.clear());
  };

  // Handlers

  handleEditorSelectionChange = (editor, { origin, ranges }) => {
    if (typeof origin !== "undefined") {
      this.setState({
        selected: this.getSelectedFromSelections(ranges, this.pathRanges),
      });
    }
  };

  handleEditorChange = (editor, { origin }) => {
    this.updatePathRanges();

    this.setState({
      document: editor.getValue(),
      paths: getPathsFromDocument(editor.getValue()),
      ...(origin !== "preview" && { selected: {} }),
    });
  };

  handleResizeEnd = () => {
    this.resize();
    this.editor.refresh();
  };

  render() {
    return (
      <Container>
        <Bar />
        <Main>
          <SplitPane
            split="vertical"
            defaultSize={700}
            onDragFinished={this.handleResizeEnd}
          >
            <Editor
              editorRef={editor => (this.editor = editor)}
              onSelectionChange={this.handleEditorSelectionChange}
              onChange={this.handleEditorChange}
            />
            <WorkspacePreview
              controllerRef={this.controllerRef}
              document={this.state.document}
              paths={this.state.paths}
              selected={this.state.selected}
              viewport={this.state.viewport}
              setPaths={this.setPaths}
              setSelected={this.setSelected}
              isSelected={this.isSelected}
              addSelected={this.addSelected}
              removeSelected={this.removeSelected}
              setHighlights={this.setHighlights}
              clearHighlights={this.clearHighlights}
            />
          </SplitPane>
        </Main>
      </Container>
    );
  }
}

export default Workspace;
