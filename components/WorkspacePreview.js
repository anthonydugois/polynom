import { default as React, Component, Fragment } from "react";
import * as Px from "polynomic";

import { default as Controller } from "./Controller";

import { default as Rule } from "../ui/Rule";
import * as Misc from "../ui/graphics/Misc";
import * as Grid from "../ui/graphics/Grid";
import * as Path from "../ui/graphics/Path";

import { ENTITIES, KEYS, DIRECTION } from "../constants";

class WorkspacePreview extends Component {
  static defaultProps = {
    controllerRef: null,

    document: null,
    paths: [],
    selected: {},
    viewport: { width: 0, height: 0 },

    setPaths: () => {},
    setSelected: () => {},
    isSelected: () => {},
    addSelected: () => {},
    removeSelected: () => {},
    setHighlights: () => {},
    clearHighlights: () => {},
  };

  state = {
    paths: this.props.paths,
  };

  constructor(props) {
    super(props);

    this.hasMoved = false;

    this.keyMap = {
      onDelete: "del",
    };

    this.keyHandlers = {
      onDelete: this.handleDelete,
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.paths !== prevState.paths) {
      return { paths: nextProps.paths };
    }

    return null;
  }

  buildSelectedPathstring = (paths, selected) => {
    const list = paths.reduce((acc, path, pathIndex) => {
      return Px.reduce(
        (seg, segIndex, segs, params, acc, pathIndex) => {
          if (
            selected[pathIndex] &&
            selected[pathIndex].includes(segIndex + 1)
          ) {
            acc.push([2, params.x3, params.y3], path[segIndex + 1]);
          }

          return acc;
        },
        [pathIndex],
        acc,
        path,
      );
    }, []);

    return Px.renderPathstring(list);
  };

  /**
   * On main SVG element mouse enter
   */
  handleMouseEnter = evt => {
    this.controllerRef.current.focus();
  };

  /**
   * On main SVG element mouse down
   */
  handleMouseDown = (props, state, handlers) => evt => {
    if (state.pressed === KEYS.MOD) {
      handlers.dragStart(evt, ENTITIES.PAN);
    } else {
      handlers.dragStart(evt, ENTITIES.SELECTOR);
    }
  };

  /**
   * On drag start
   */
  handleDragStart = (props, state) => {
    switch (state.dragging) {
      case ENTITIES.SEGMENT: {
        this.handleSegDragStart();

        break;
      }
    }
  };

  /**
   * On drag end
   */
  handleDragEnd = (props, state, prevState) => {
    switch (prevState.dragging) {
      case ENTITIES.SEGMENT: {
        this.handleSegDragEnd();

        break;
      }

      case ENTITIES.SELECTOR: {
        this.handleSelectDragEnd(props, state);

        break;
      }
    }
  };

  /**
   * On select drag end
   */
  handleSelectDragEnd = (props, state) => {
    const selected = {};

    this.state.paths.forEach((path, pathIndex) => {
      const segIndices = Px.reduce(
        (seg, segIndex, segs, params, acc) => {
          const betweenHorizontal =
            state.x >= state.x0
              ? params.x3 >= state.x0 && params.x3 <= state.x
              : params.x3 >= state.x && params.x3 <= state.x0;

          const betweenVertical =
            state.y >= state.y0
              ? params.y3 >= state.y0 && params.y3 <= state.y
              : params.y3 >= state.y && params.y3 <= state.y0;

          if (betweenHorizontal && betweenVertical) {
            acc.push(segIndex);
          }

          return acc;
        },
        [],
        [],
        path,
      );

      if (segIndices.length > 0) {
        selected[pathIndex] = segIndices;
      }
    });

    if (state.pressed === KEYS.SHIFT) {
      // Modifier key is pressed: add selected segments to the current selection
      const merged = {};

      this.state.paths.forEach((_, pathIndex) => {
        const segIndices = [];

        if (this.props.selected[pathIndex]) {
          segIndices.push(...this.props.selected[pathIndex]);
        }

        if (selected[pathIndex]) {
          segIndices.push(...selected[pathIndex]);
        }

        if (segIndices.length > 0) {
          merged[pathIndex] = [...new Set(segIndices)];
        }
      });

      this.props.setSelected(merged);
    } else {
      // Modifier key is not present: set selected segments as current selection
      this.props.setSelected(selected);
    }
  };

  /**
   * On seg drag start
   */
  handleSegDragStart = () => {
    this.hasMoved = false;
  };

  /**
   * On seg drag end
   */
  handleSegDragEnd = () => {
    if (this.state.paths !== this.props.paths) {
      this.props.setPaths(this.state.paths);
    }
  };

  /**
   * On seg drag
   */
  handleSegDrag = (props, state, prevState) => {
    if (!this.hasMoved) {
      this.hasMoved = true;
    }

    this.setState(({ paths }) => ({
      paths: paths.map(
        (path, index) =>
          this.props.selected[index]
            ? Px.translate(
                state.x - prevState.x,
                state.y - prevState.y,
                this.props.selected[index],
                path,
              )
            : path,
      ),
    }));
  };

  /**
   * On seg click
   */
  handleSegClick = (pathIdx, segIdx, props, state, handlers) => evt => {
    if (state.pressed === KEYS.SHIFT) {
      if (this.props.isSelected(pathIdx, segIdx)) {
        if (!this.hasMoved) {
          this.props.removeSelected(pathIdx, segIdx);
        }
      } else {
        this.props.addSelected(pathIdx, segIdx);
      }
    }
  };

  /**
   * On seg mouse enter
   */
  handleSegMouseEnter = (pathIdx, segIdx, props, state, handlers) => evt => {
    if (state.dragging === ENTITIES.NONE) {
      this.props.setHighlights({ [pathIdx]: [segIdx] });
    }
  };

  /**
   * On seg mouse leave
   */
  handleSegMouseLeave = (pathIdx, segIdx, props, state, handlers) => evt => {
    if (state.dragging === ENTITIES.NONE) {
      this.props.clearHighlights();
    }
  };

  /**
   * On seg mouse down
   */
  handleSegMouseDown = (pathIdx, segIdx, props, state, handlers) => evt => {
    evt.stopPropagation();

    if (state.pressed !== KEYS.SHIFT) {
      this.props.setSelected({ [pathIdx]: [segIdx] });
    }

    handlers.dragStart(evt, ENTITIES.SEGMENT);
  };

  /**
   * On delete key down
   */
  handleDelete = () => {
    const paths = this.state.paths.map(
      (path, pathIdx) =>
        this.props.selected[pathIdx]
          ? Px.filter(
              (seg, segIdx) => !this.props.selected[pathIdx].includes(segIdx),
              [],
              path,
            )
          : path,
    );

    // should avoid double render
    this.props.setSelected({});
    this.props.setPaths(paths);
  };

  renderSeg = (pathIdx, props, state, handlers) => (
    seg,
    segIdx,
    segs,
    params,
  ) => {
    const radius = 2.5 / state.zoom;
    const isSelected = this.props.isSelected(pathIdx, segIdx);

    const handleClick = this.handleSegClick(
      pathIdx,
      segIdx,
      props,
      state,
      handlers,
    );
    const handleMouseEnter = this.handleSegMouseEnter(
      pathIdx,
      segIdx,
      props,
      state,
      handlers,
    );
    const handleMouseLeave = this.handleSegMouseLeave(
      pathIdx,
      segIdx,
      props,
      state,
      handlers,
    );
    const handleMouseDown = this.handleSegMouseDown(
      pathIdx,
      segIdx,
      props,
      state,
      handlers,
    );

    return (
      <Path.Segment key={segIdx}>
        <Path.SegmentPoint
          cx={params.x3}
          cy={params.y3}
          r={radius}
          isSelected={isSelected}
          onClick={handleClick}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onMouseDown={handleMouseDown}
        />
      </Path.Segment>
    );
  };

  renderSegs = (props, state, handlers) => (path, pathIndex) => {
    return Px.map(this.renderSeg(pathIndex, props, state, handlers), [], path);
  };

  renderPath = (path, pathIndex) => {
    return <Path.Path key={pathIndex} d={Px.renderPathstring(path)} />;
  };

  render() {
    if (!this.props.document) {
      return null;
    }

    return (
      <Controller
        controllerRef={this.props.controllerRef}
        snapGrid={false}
        keyMap={this.keyMap}
        keyHandlers={this.keyHandlers}
        onDragStart={this.handleDragStart}
        onDragEnd={this.handleDragEnd}
        onDragSegment={this.handleSegDrag}
      >
        {(props, state, handlers) => {
          const handleMouseDown = this.handleMouseDown(props, state, handlers);

          const width = this.props.viewport.width / state.zoom;
          const height = this.props.viewport.height / state.zoom;
          const gridRadius = props.grid.radius / state.zoom;

          const dx = state.x - state.x0;
          const dy = state.y - state.y0;

          const tx = dx < 0 ? dx : 0;
          const ty = dy < 0 ? dy : 0;

          return (
            <Fragment>
              <Rule
                direction={DIRECTION.HORIZONTAL}
                pan={state.panX * state.zoom}
                size={this.props.viewport.width}
                step={25 * state.zoom}
              />
              <Rule
                direction={DIRECTION.VERTICAL}
                pan={state.panY * state.zoom}
                size={this.props.viewport.height}
                step={25 * state.zoom}
              />

              <Misc.Main
                innerRef={this.props.controllerRef}
                tabIndex={-1}
                viewBox={`${state.panX} ${state.panY} ${width} ${height}`}
                onMouseDown={handleMouseDown}
                onMouseMove={handlers.handleMouseMove}
              >
                <Misc.Defs>
                  <Grid.GridDef
                    x={0}
                    y={0}
                    width={props.grid.width}
                    height={props.grid.height}
                  >
                    <Grid.GridPoint
                      r={gridRadius}
                      cx={props.grid.width - gridRadius}
                      cy={props.grid.height - gridRadius}
                    />
                  </Grid.GridDef>
                </Misc.Defs>

                {/* Layer 0: background + grid */}
                <Misc.Layer>
                  <Grid.GridContainer
                    x={state.panX}
                    y={state.panY}
                    width="100%"
                    height="100%"
                    transform={`translate(${gridRadius}, ${gridRadius})`}
                  />
                </Misc.Layer>

                {/* Layer 1: the SVG document */}
                <Misc.Layer
                  opacity={0.75}
                  dangerouslySetInnerHTML={{ __html: this.props.document }}
                />

                {/* Layer 2: the extracted paths */}
                <Misc.Layer>{this.state.paths.map(this.renderPath)}</Misc.Layer>

                {/* Layer 3: the highlights of selected segments */}
                <Misc.Layer>
                  <Path.HighlightPath
                    d={this.buildSelectedPathstring(
                      this.state.paths,
                      this.props.selected,
                    )}
                  />
                </Misc.Layer>

                {/* Layer 4: the segments */}
                <Misc.Layer>
                  {this.state.paths.map(
                    this.renderSegs(props, state, handlers),
                  )}
                </Misc.Layer>

                {/* Layer 5: the selection rect */}
                <Misc.Layer>
                  {state.dragging === ENTITIES.SELECTOR && (
                    <Misc.Selector
                      transform={`translate(${tx}, ${ty})`}
                      x={state.x0}
                      y={state.y0}
                      width={Math.abs(dx)}
                      height={Math.abs(dy)}
                    />
                  )}
                </Misc.Layer>
              </Misc.Main>
            </Fragment>
          );
        }}
      </Controller>
    );
  }
}

export default WorkspacePreview;
