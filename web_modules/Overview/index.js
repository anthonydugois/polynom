import React, { Component, PropTypes } from "react"
import { findDOMNode } from "react-dom"
import { connect } from "react-redux"
import Grid from "Grid"
import Shape from "Shape"
import * as pathsActions from "../../src/actions/paths"
import * as pointsActions from "../../src/actions/points"
import { activePathsSelector } from "../../src/selectors/activePaths"
import "./styles"

const mapStateToProps = (state) => ({
  builder: state.builder,
  pathsById: state.pathsById,
  pointsById: state.pointsById,
  activePaths: activePathsSelector(state),
})

const mapDispatchToProps = (dispatch) => ({
  onOverviewDblClick(pathId, code, x, y, parameters) {
    dispatch(pointsActions.createPoint(pathId, code, x, y, parameters))
  },
  onPointCtrlClick(pathId, pointId) {
    dispatch(pathsActions.setActivePath(pathId, true))
    dispatch(pointsActions.setActivePoint(pointId, true))
  },
  onPointClick(pathId, pointId) {
    dispatch(pathsActions.deactivatePaths())
    dispatch(pointsActions.deactivatePoints())
    dispatch(pathsActions.setActivePath(pathId, true))
    dispatch(pointsActions.setActivePoint(pointId, true))
  },
  onXPositionChange(pointId, x) {
    dispatch(pointsActions.setPointX(pointId, x))
  },
  onYPositionChange(pointId, y) {
    dispatch(pointsActions.setPointY(pointId, y))
  },
  onParametersChange(pointId, parameters) {
    dispatch(pointsActions.setPointParameters(pointId, parameters))
  },
})

class Overview extends Component {
  state = {
    isDragging: false,
    draggedPoint: null,
  };

  componentDidMount() {
    document.addEventListener("mousemove", this.handleMouseMove)
    document.addEventListener("mouseup", this.handleMouseUp)
  }

  componentWillUnmount() {
    document.removeEventListener("mousemove", this.handleMouseMove)
    document.removeEventListener("mouseup", this.handleMouseUp)
  }

  getCoords = (e) => {
    const { builder } = this.props
    const { left, top } = findDOMNode(this).getBoundingClientRect()

    let x = Math.round(e.clientX - left)
    let y = Math.round(e.clientY - top)

    // grid snaping
    if (builder.grid.snapToGrid) {
      x = builder.grid.size * Math.round(x / builder.grid.size)
      y = builder.grid.size * Math.round(y / builder.grid.size)
    }

    return { x, y }
  };

  handlePointMouseDown = (key) => {
    this.setState({
      isDragging: true,
      draggedPoint: key,
    })
  };

  handleMouseUp = () => {
    if (this.state.isDragging) {
      this.setState({
        isDragging: false,
        draggedPoint: null,
      })
    }
  };

  handleMouseMove = (e) => {
    if (this.state.isDragging) {
      e.preventDefault()

      const { x, y } = this.getCoords(e)

      this.props.onXPositionChange(this.state.draggedPoint, x)
      this.props.onYPositionChange(this.state.draggedPoint, y)
    }
  };

  handleOverviewDblClick = (e) => {
    const { x, y } = this.getCoords(e)

    this.props.onOverviewDblClick(this.props.activePaths[0], "L", x, y, {})
  };

  renderShape = (key) => {
    const path = this.props.pathsById[key]

    return (
      <Shape
        key={ key }
        path={ path }
        pointsById={ this.props.pointsById }
        keyActions={ this.props.keyActions }
        onPointCtrlClick={ (pointId) =>
          this.props.onPointCtrlClick(path.id, pointId) }
        onPointClick={ (pointId) =>
          this.props.onPointClick(path.id, pointId) }
        onPointMouseDown={ this.handlePointMouseDown } />
    )
  };

  render() {
    const { builder } = this.props

    return (
      <svg
        className="ad-Overview"
        style={ {
          width: builder.width,
          height: builder.height,
        } }
        onDoubleClick={ this.handleOverviewDblClick }>
        <Grid
          width={ builder.width }
          height={ builder.height }
          grid={ builder.grid } />

        { builder.paths.map(this.renderShape) }
      </svg>
    )
  }
}

Overview.propTypes = {
  onOverviewDblClick: PropTypes.func.isRequired,
  onPointCtrlClick: PropTypes.func.isRequired,
  onPointClick: PropTypes.func.isRequired,
  onXPositionChange: PropTypes.func.isRequired,
  onYPositionChange: PropTypes.func.isRequired,
  onParametersChange: PropTypes.func.isRequired,
  keyActions: PropTypes.array.isRequired,
  builder: PropTypes.object.isRequired,
  pointsById: PropTypes.object.isRequired,
  pathsById: PropTypes.object.isRequired,
  activePaths: PropTypes.array.isRequired,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Overview)
