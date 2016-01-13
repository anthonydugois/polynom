import React, { Component, PropTypes } from "react"
import { findDOMNode } from "react-dom"
import { connect } from "react-redux"
import Grid from "Grid"
import Shape from "Shape"
import "./styles"

import * as pointsActions from "../../src/actions/points"

function mapStateToProps(state) {
  const {
    builder,
    paths,
    points,
  } = state

  const activePathId = Object.keys(paths).filter((id) => paths[id].isActive)[0]
  const activePath = paths[activePathId]

  return {
    builder,
    paths,
    activePath,
    points,
  }
}

function getStyles(props) {
  const {
    width,
    height,
  } = props.builder

  return {
    width,
    height,
  }
}

class Overview extends Component {
  handleOverviewClick = (e) => {
    const {
      dispatch,
      builder,
      activePath,
    } = this.props

    const { left, top } = findDOMNode(this).getBoundingClientRect()

    let x = Math.round(e.clientX - left)
    let y = Math.round(e.clientY - top)

    // grid snaping
    if (builder.grid.snapToGrid) {
      x = builder.grid.size * Math.round(x / builder.grid.size)
      y = builder.grid.size * Math.round(y / builder.grid.size)
    }

    dispatch(pointsActions.addPoint(activePath.id, "L", x, y, false, false, {}))
  };

  renderShape = (path) => {
    return (
      <Shape
        key={ path.id }
        path={ path }
        points={ path.points.map((id) => this.props.points[id]) }
        onPointClick={ (id) =>
          this.props.dispatch(pointsActions.setActivePoint(id)) } />
    )
  };

  render() {
    const {
      builder,
      paths,
    } = this.props

    return (
      <svg
        className="ad-Overview"
        style={ getStyles(this.props) }
        onClick={ this.handleOverviewClick }>
        <Grid
          width={ builder.width }
          height={ builder.height }
          grid={ builder.grid } />

        { Object.keys(paths).map((id) =>
            this.renderShape(paths[id])) }
      </svg>
    )
  }
}

Overview.propTypes = {
  dispatch: PropTypes.func.isRequired,
  builder: PropTypes.object.isRequired,
  paths: PropTypes.object.isRequired,
  points: PropTypes.object.isRequired,
  activePath: PropTypes.object.isRequired,
}

export default connect(mapStateToProps)(Overview)
