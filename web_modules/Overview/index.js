import React, { Component, PropTypes } from "react"
import { findDOMNode } from "react-dom"
import { connect } from "react-redux"
import Grid from "Grid"
import Shape from "Shape"
import "./styles"

import * as pointsActions from "../../src/actions/points"

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
      paths,
    } = this.props

    const path = paths.filter(({ isActive }) => isActive)[0]
    const { left, top } = findDOMNode(this).getBoundingClientRect()
    const x = e.clientX - left
    const y = e.clientY - top

    dispatch(pointsActions.addPoint(path.id, x, y))
    dispatch(pointsActions.setActivePoint(path.id, path.points.length))
  };

  renderShape = (path) => {
    const { dispatch } = this.props

    return (
      <Shape
        key={ path.id }
        path={ path }
        onPointClick={ (id, pointId) =>
          dispatch(pointsActions.setActivePoint(id, pointId)) } />
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

        { paths.map((path) => this.renderShape(path)) }
      </svg>
    )
  }
}

Overview.propTypes = {
  dispatch: PropTypes.func.isRequired,
  builder: PropTypes.object.isRequired,
  paths: PropTypes.array.isRequired,
}

export default connect((state) => state)(Overview)
