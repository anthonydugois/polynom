import React, { Component, PropTypes } from "react"
import { connect } from "react-redux"
import Settings from "Settings"
import Setting from "Settings/Setting"
import Range from "Range"
import Choices from "Choices"
import Choice from "Choices/Choice"

import * as pointsActions from "../../src/actions/points"

class SidebarPoint extends Component {
  handleTypeChange = (e) => {
    this.props.dispatch(pointsActions.setPointCode(
      this.props.path.id,
      this.props.point.id,
      e.target.value
    ))
  };

  handleXPositionChange = (e) => {
    let x = parseInt(e.target.value)

    if (isNaN(x) || x < 0) {
      x = 0
    } else if (x > this.props.builder.width) {
      x = this.props.builder.width
    }

    this.props.dispatch(pointsActions.setPointX(
      this.props.path.id,
      this.props.point.id,
      x
    ))
  };

  handleYPositionChange = (e) => {
    let y = parseInt(e.target.value)

    if (isNaN(y) || y < 0) {
      y = 0
    } else if (y > this.props.builder.height) {
      y = this.props.builder.height
    }

    this.props.dispatch(pointsActions.setPointY(
      this.props.path.id,
      this.props.point.id,
      y
    ))
  };

  render() {
    const {
      builder,
      path,
      point,
    } = this.props

    const gridStep = builder.grid.snapToGrid ? builder.grid.size : 1
    const pointCode = point.code.toLowerCase()

    return (
      <Settings>
        <Setting>
          <Choices>
            <Choice
              name="type"
              value="M"
              checked={ pointCode === "m" }
              onChange={ this.handleTypeChange }>
              Move
            </Choice>

            <Choice
              name="type"
              value="L"
              checked={ pointCode === "l" }
              onChange={ this.handleTypeChange }>
              Line
            </Choice>

            <Choice
              name="type"
              value="Q"
              checked={ pointCode === "q" }
              onChange={ this.handleTypeChange }>
              Quad
            </Choice>

            <Choice
              name="type"
              value="C"
              checked={ pointCode === "c" }
              onChange={ this.handleTypeChange }>
              Cub
            </Choice>

            <Choice
              name="type"
              value="A"
              checked={ pointCode === "a" }
              onChange={ this.handleTypeChange }>
              Arc
            </Choice>
          </Choices>
        </Setting>

        <Setting label="Point X position">
          <Range
            min={ 0 }
            max={ builder.width }
            step={ gridStep }
            value={ point.x }
            onChange={ this.handleXPositionChange } />
        </Setting>

        <Setting label="Point Y position">
          <Range
            min={ 0 }
            max={ builder.height }
            step={ gridStep }
            value={ point.y }
            onChange={ this.handleYPositionChange } />
        </Setting>
      </Settings>
    )
  }
}

SidebarPoint.propTypes = {
  dispatch: PropTypes.func.isRequired,
  builder: PropTypes.object.isRequired,
  path: PropTypes.object.isRequired,
  point: PropTypes.object.isRequired,
}

export default connect((state) => {
  const { builder, paths } = state

  const path = paths.filter(({ isActive }) => isActive)[0]
  const point = path.points.filter(({ isActive }) => isActive)[0]

  return {
    builder,
    path,
    point,
  }
})(SidebarPoint)
