import React, { Component, PropTypes } from "react"
import { connect } from "react-redux"
import Settings from "Settings"
import Setting from "Settings/Setting"
import Range from "Range"
import Choices from "Choices"
import Choice from "Choices/Choice"

import * as pointsActions from "../../src/actions/points"

function getParameters(code, point, previousPoint) {
  const middleX = previousPoint.x + (point.x - previousPoint.x) / 2
  const middleY = previousPoint.y + (point.y - previousPoint.y) / 2

  switch (code.toLowerCase()) {
  case "q":
    return pointsActions.Q(middleX, middleY)

  case "c":
    return pointsActions.C(middleX, middleY, middleX, middleY)

  case "s":
    return pointsActions.S(middleX, middleY)

  case "a":
    return pointsActions.A(50, 50, 0, false, false)

  default:
    return {}
  }
}

class SidebarPoint extends Component {
  handleTypeChange = (e) => {
    const {
      dispatch,
      path,
      point,
      previousPoint,
    } = this.props

    dispatch(pointsActions.setPointCode(
      path.id,
      point.id,
      e.target.value,
      getParameters(e.target.value, point, previousPoint)
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

  handleXAnchorChange = (e) => {

  };

  render() {
    const {
      builder,
      path,
      point,
      previousPoint,
    } = this.props

    const step = builder.grid.snapToGrid ? builder.grid.size : 1
    const code = point.code.toLowerCase()
    const prevCode = previousPoint.code.toLowerCase()

    return (
      <Settings>
        { /* Point general settings */ }

        <Setting>
          <Choices>
            <Choice
              name="type"
              value="M"
              checked={ code === "m" }
              onChange={ this.handleTypeChange }>
              Move
            </Choice>

            <Choice
              name="type"
              value="L"
              checked={ code === "l" }
              onChange={ this.handleTypeChange }>
              Line
            </Choice>

            <Choice
              name="type"
              value="Q"
              checked={ code === "q" }
              onChange={ this.handleTypeChange }>
              Quad
            </Choice>

            <Choice
              name="type"
              value="C"
              checked={ code === "c" }
              onChange={ this.handleTypeChange }>
              Cub
            </Choice>

            <Choice
              name="type"
              value="A"
              checked={ code === "a" }
              onChange={ this.handleTypeChange }>
              Arc
            </Choice>
          </Choices>
        </Setting>

        <Setting label="Point X position">
          <Range
            min={ 0 }
            max={ builder.width }
            step={ step }
            value={ point.x }
            onChange={ this.handleXPositionChange } />
        </Setting>

        <Setting label="Point Y position">
          <Range
            min={ 0 }
            max={ builder.height }
            step={ step }
            value={ point.y }
            onChange={ this.handleYPositionChange } />
        </Setting>

        { /* Quadratic curve settings */ }

        { (code === "q" || (code === "t" && prevCode !== "q")) && (
          <Setting label="Anchor X position">
            <Range
              min={ 0 }
              max={ builder.width }
              step={ step }
              value={ point.parameters.x1 }
              onChange={ this.handleXAnchorChange } />
          </Setting>
        ) }
      </Settings>
    )
  }
}

SidebarPoint.propTypes = {
  dispatch: PropTypes.func.isRequired,
  builder: PropTypes.object.isRequired,
  path: PropTypes.object.isRequired,
  point: PropTypes.object.isRequired,
  previousPoint: PropTypes.object.isRequired,
}

export default connect((state) => {
  const path = state.paths.filter(({ isActive }) => isActive)[0]
  let point = {}, previousPoint = {}

  path.points.forEach((p, index, points) => {
    if (p.isActive) {
      point = p

      if (index > 0) {
        previousPoint = points[index - 1]
      }
    }
  })

  return {
    builder: state.builder,
    path,
    point,
    previousPoint,
  }
})(SidebarPoint)
