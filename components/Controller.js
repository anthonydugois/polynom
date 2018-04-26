import { default as React, Component } from "react";
import { HotKeys } from "react-hotkeys";
import { default as styled } from "styled-components";

import { ENTITIES, KEYS } from "../constants";

const Container = styled(HotKeys)`
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-areas:
    ".     hrule"
    "vrule board";
  grid-template-columns: 2rem auto;
  grid-template-rows: 2rem auto;
  background: ${props => props.theme.colors.gray["10"]};
`;

class Controller extends Component {
  static defaultProps = {
    controllerRef: null,

    // Behavior
    snapGrid: false,

    // Additional keymap
    keyMap: {},
    keyHandlers: {},

    // Object configuration
    grid: { width: 25, height: 25, radius: 0.8 },
    zoom: { step: 0.1, min: 0.4, max: 4 },

    // Event handlers
    onDragStart: () => {},
    onDragEnd: () => {},
    onDragSegment: () => {},
    onPan: () => {},
    onZoomIn: () => {},
    onZoomOut: () => {},
    onSelect: () => {},
  };

  state = {
    zoom: 1,
    panX: 0,
    panY: 0,
    x0: 0,
    y0: 0,
    x: 0,
    y: 0,
    dragging: ENTITIES.NONE,
    pressed: KEYS.NONE,
  };

  constructor(props) {
    super(props);

    this.keyMap = {
      ...this.props.keyMap,

      onModDown: { sequence: "mod", action: "keydown" },
      onModUp: { sequence: "mod", action: "keyup" },
      onShiftDown: { sequence: "shift", action: "keydown" },
      onShiftUp: { sequence: "shift", action: "keyup" },

      onZoomIn: "mod+a",
      onZoomOut: "mod+b",
    };

    this.keyHandlers = {
      ...this.props.keyHandlers,

      onModDown: this.handleModDown,
      onModUp: this.handleModUp,
      onShiftDown: this.handleShiftDown,
      onShiftUp: this.handleShiftUp,

      onZoomIn: this.handleZoomIn,
      onZoomOut: this.handleZoomOut,
    };

    this.handlers = {
      handleMouseMove: this.handleMouseMove,
      dragStart: this.dragStart,
      dragEnd: this.dragEnd,
      zoomIn: this.zoomIn,
      zoomOut: this.zoomOut,
      pan: this.pan,
    };
  }

  componentDidMount() {
    document.addEventListener("mouseup", this.handleMouseUp);
  }

  componentWillUnmount() {
    document.removeEventListener("mouseup", this.handleMouseUp);
  }

  getCoordsFromEvent = evt => {
    const bounds = this.props.controllerRef.current.getBoundingClientRect();

    return {
      x: evt.clientX - bounds.left,
      y: evt.clientY - bounds.top,
    };
  };

  getSnappedCoords = (x, y) => {
    const { snapGrid, grid } = this.props;
    const { zoom } = this.state;

    const gridWidth = grid.width * zoom;
    const gridHeight = grid.height * zoom;

    return {
      x: snapGrid ? Math.round(x / gridWidth) * gridWidth : x,
      y: snapGrid ? Math.round(y / gridHeight) * gridHeight : y,
    };
  };

  getCoords = (x, y) => {
    const { zoom, panX, panY } = this.state;

    return {
      x: panX + x / zoom,
      y: panY + y / zoom,
    };
  };

  dragStart = (evt, entity) => {
    const coords = this.getCoordsFromEvent(evt);
    const { x, y } = this.getCoords(coords.x, coords.y);
    const prevState = this.state;

    this.setState({ dragging: entity, x0: x, y0: y, x, y }, () => {
      this.props.onDragStart(this.props, this.state, prevState);
    });
  };

  dragEnd = evt => {
    const prevState = this.state;

    this.setState({ dragging: ENTITIES.NONE }, () => {
      this.props.onDragEnd(this.props, this.state, prevState);
    });
  };

  zoomIn = (step = this.props.zoom.step) => {
    if (this.state.zoom < this.props.zoom.max) {
      const prevState = this.state;

      this.setState(
        ({ zoom }) => ({ zoom: zoom + step }),
        () => {
          this.props.onZoomIn(this.props, this.state, prevState);
        },
      );
    }
  };

  zoomOut = (step = this.props.zoom.step) => {
    if (this.state.zoom > this.props.zoom.min) {
      const prevState = this.state;

      this.setState(
        ({ zoom }) => ({ zoom: zoom - step }),
        () => {
          this.props.onZoomOut(this.props, this.state, prevState);
        },
      );
    }
  };

  pan = (dx, dy) => {
    const prevState = this.state;

    this.setState(
      ({ panX, panY }) => ({
        panX: panX - dx,
        panY: panY - dy,
      }),
      () => {
        this.props.onPan(this.props, this.state, prevState);
      },
    );
  };

  handleMouseEnter = evt => {
    this.props.controllerRef.current.focus();
  };

  handleMouseMove = evt => {
    const evtCoords = this.getCoordsFromEvent(evt);

    switch (this.state.dragging) {
      case ENTITIES.PAN: {
        const coords = this.getCoords(evtCoords.x, evtCoords.y);

        this.pan(coords.x - this.state.x, coords.y - this.state.y);

        break;
      }

      case ENTITIES.SELECTOR: {
        const coords = this.getCoords(evtCoords.x, evtCoords.y);
        const prevState = this.state;

        this.setState({ x: coords.x, y: coords.y }, () => {
          this.props.onSelect(this.props, this.state, prevState);
        });

        break;
      }

      case ENTITIES.SEGMENT: {
        const snappedCoords = this.getSnappedCoords(evtCoords.x, evtCoords.y);
        const coords = this.getCoords(snappedCoords.x, snappedCoords.y);
        const prevState = this.state;

        this.setState({ x: coords.x, y: coords.y }, () => {
          this.props.onDragSegment(this.props, this.state, prevState);
        });

        break;
      }
    }
  };

  handleMouseUp = evt => {
    this.dragEnd(evt);
  };

  // Hot keys handlers

  handleShiftDown = evt => {
    evt.preventDefault();

    this.setState({ pressed: KEYS.SHIFT });
  };

  handleShiftUp = evt => {
    evt.preventDefault();

    this.setState({ pressed: KEYS.NONE });
  };

  handleModDown = evt => {
    evt.preventDefault();

    this.setState({ pressed: KEYS.MOD });
  };

  handleModUp = evt => {
    evt.preventDefault();

    this.setState({ pressed: KEYS.NONE });
  };

  handleZoomIn = evt => {
    evt.preventDefault();

    this.zoomIn();
  };

  handleZoomOut = evt => {
    evt.preventDefault();

    this.zoomOut();
  };

  render() {
    return (
      <Container
        keyMap={this.keyMap}
        handlers={this.keyHandlers}
        onMouseEnter={this.handleMouseEnter}
      >
        {this.props.children(this.props, this.state, this.handlers)}
      </Container>
    );
  }
}

export default Controller;
