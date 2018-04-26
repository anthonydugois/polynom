import { default as React, Component } from "react";
import { default as styled, injectGlobal } from "styled-components";

import { default as CodeMirror } from "codemirror";
import { default as styles } from "codemirror/lib/codemirror.css";
import "codemirror/mode/xml/xml";
import "codemirror/addon/fold/xml-fold";
import "codemirror/addon/mode/overlay";
import "codemirror/addon/selection/active-line";
import "codemirror/addon/edit/matchtags";
import "codemirror/addon/search/searchcursor";

import { default as main } from "../themes/main";

injectGlobal`
  ${styles}

  .CodeMirror {
    height: 100%;
    background: ${main.colors.gray["0"]};
    line-height: 1.6;
    font-family: "Fira Mono", monospace;
    font-size: 1.2rem;
    color: ${main.colors.gray["12"]};

    &-lines {
      padding: 2rem 0;
    }

    & pre {
      padding: 0 2rem 0 0;
    }

    &-gutters {
      border: none;
      background: none;
    }

    &-linenumber {
      padding: 0 2.5rem 0 0;
      min-width: 4.5rem;
      color: ${main.colors.gray["3"]};
    }

    &-cursor {
      border-left: 2px solid ${main.colors.primary["0"]};
    }

    &-ruler {
      border-left: 1px solid #ccc;
    }

    &-selected,
    &-focused &-selected {
      background: ${main.colors.gray["2"]};
    }

    &-activeline-background {
      border: 2px solid ${main.colors.gray["1"]};
      background: none;
    }
    &-activeline-gutter &-linenumber {
      color: ${main.colors.gray["3"]};
    }

    &-matchingtag {
      background: none;
    }

    &.cm-s-polynom &-matchingtag.cm-tag:not(.cm-bracket) {
      background: ${main.colors.gray["1"]};
    }

    &.cm-s-polynom .cm-indt {
      padding: 2px 0;
      border-left: 1px solid ${main.colors.gray["1"]};
    }

    &.cm-s-polynom .cm-seg {
      padding: 2px 0;
      color: ${main.colors.primary["0"]};

      &-hovered {
        box-shadow: 0 0 0 1px ${main.colors.primary["0"]};
      }
    }
    &.cm-s-polynom .cm-seg-m { }
    &.cm-s-polynom .cm-seg-l { }
    &.cm-s-polynom .cm-seg-h { }
    &.cm-s-polynom .cm-seg-v { }
    &.cm-s-polynom .cm-seg-q { }
    &.cm-s-polynom .cm-seg-t { }
    &.cm-s-polynom .cm-seg-c { }
    &.cm-s-polynom .cm-seg-s { }
    &.cm-s-polynom .cm-seg-a { }
    &.cm-s-polynom .cm-seg-z { }

    &.cm-s-polynom .cm-comment {
      font-style: italic;
      color: ${main.colors.gray["4"]};
    }
    &.cm-s-polynom .cm-string {
      color: ${main.colors.gray["8"]};
    }
    &.cm-s-polynom .cm-tag {
      color: ${main.colors.gray["5"]};

      &.cm-bracket {
        color: ${main.colors.gray["10"]};
      }
    }
    &.cm-s-polynom .cm-attribute {
      color: ${main.colors.gray["10"]};
    }
  }
`;

const Container = styled.div`
  width: 100%;
  height: 100%;
`;

CodeMirror.defineMode("pathstring", (config, parserConfig) =>
  CodeMirror.overlayMode(CodeMirror.getMode(config, "xml"), {
    startState() {
      return {
        inIndentContext: false,
        inAttributeContext: false,
      };
    },
    token(stream, state) {
      if (stream.sol()) {
        // Reset indent state at the start of the line
        state.inIndentContext = true;
      }

      if (state.inIndentContext) {
        // This is an indent context
        if (stream.match("  ")) {
          // An indent is detected
          return "indt";
        } else {
          // This is the end of indent context
          state.inIndentContext = false;
        }
      }

      if (state.inAttributeContext) {
        // This is a pathstring context
        stream.eatSpace();

        if (stream.match(/"/)) {
          // This is the end of the pathstring
          state.inAttributeContext = false;
        } else {
          const segment = stream.match(/([MLHVQTCSAZmlhvqtcsaz])[Ee\d\s.,+-]*/);

          if (segment) {
            return `seg seg-${segment[1].toLowerCase()}`;
          } else {
            // No segment found, advance the stream until the end of the pathstring
            while (stream.next() != null && !stream.match(/"/, false)) {
              /* */
            }
          }
        }
      } else {
        // This is not a pathstring context
        if (stream.match(/ d="/)) {
          // This is the start of the pathstring
          state.inAttributeContext = true;
        } else {
          // Advance the stream until the start of a pathstring is found
          while (stream.next() != null && !stream.match(/ d="/, false)) {
            /* */
          }
        }
      }

      return null;
    },
  }),
);

class Editor extends Component {
  constructor(props) {
    super(props);

    this.textareaRef = React.createRef();
  }

  static defaultProps = {
    editorRef: () => {},
    onChange: () => {},
    onSelectionChange: () => {},
    onBlur: () => {},
    onFocus: () => {},
  };

  componentDidMount() {
    this.editor = CodeMirror.fromTextArea(this.textareaRef.current, {
      mode: "pathstring",
      theme: "polynom",
      indentUnit: 2,
      tabSize: 2,
      lineWrapping: true,
      lineNumbers: true,
      showCursorWhenSelecting: true,
      autofocus: true,
      allowDropFileTypes: [],
      flattenSpans: false,
      styleActiveLine: true,
      matchTags: { bothTags: true },
      extraKeys: {
        Tab: editor => {
          const indent = editor.getOption("indentUnit"),
            spaces = Array(indent + 1).join(" ");

          editor.replaceSelection(spaces);
        },
      },
    });

    // Event listeners
    this.editor.on("change", this.props.onChange);
    this.editor.on("beforeSelectionChange", this.props.onSelectionChange);
    this.editor.on("blur", this.props.onBlur);
    this.editor.on("focus", this.props.onFocus);

    // Expose editor instance
    this.props.editorRef(this.editor);
  }

  handleMouseEnter = evt => {
    this.editor.focus();
  };

  render() {
    return (
      <Container onMouseEnter={this.handleMouseEnter}>
        <textarea ref={this.textareaRef} />
      </Container>
    );
  }
}

export default Editor;
