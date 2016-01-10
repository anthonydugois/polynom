import React, { Component, PropTypes } from "react"
import { connect } from "react-redux"
import Button from "Button"
import Settings from "Settings"
import Setting from "Settings/Setting"
import Range from "Range"
import Choices from "Choices"
import Choice from "Choices/Choice"
import Checkbox from "Checkbox"

import * as pointsActions from "../../src/actions/points"

function getParameters(code, point, previousPoint) {
  const middleX = previousPoint.x + (point.x - previousPoint.x) / 2
  const middleY = previousPoint.y + (point.y - previousPoint.y) / 2

  switch (code.toLowerCase()) {
  case "q":
    return {
      x1: middleX,
      y1: middleY,
    }

  case "c":
    return {
      x1: middleX,
      y1: middleY,
      x2: middleX,
      y2: middleY,
    }

  case "s":
    return {
      x2: middleX,
      y2: middleY,
    }

  case "a":
    return {
      rx: 50,
      ry: 50,
      xAxisRotation: 0,
      largeArc: false,
      sweep: false,
    }

  default:
    return {}
  }
}

function keepInRange(n, min, max) {
  n = parseInt(n)

  if (isNaN(n) || n < min) {
    return min
  } else if (n > max) {
    return max
  }

  return n
}

class SidebarPoint extends Component {
  handleTypeChange = (e) => {
    this.props.dispatch(pointsActions.setPointCode(
      this.props.path.id,
      this.props.point.id,
      e.target.value,
      getParameters(e.target.value, this.props.point, this.props.previousPoint)
    ))
  };

  handleXPositionChange = (e) => {
    this.props.dispatch(pointsActions.setPointX(
      this.props.path.id,
      this.props.point.id,
      keepInRange(e.target.value, 0, this.props.builder.width)
    ))
  };

  handleYPositionChange = (e) => {
    this.props.dispatch(pointsActions.setPointY(
      this.props.path.id,
      this.props.point.id,
      keepInRange(e.target.value, 0, this.props.builder.height)
    ))
  };

  handleQuadX1Change = (e) => {
    this.props.dispatch(pointsActions.setQuadX1(
      this.props.path.id,
      this.props.point.id,
      keepInRange(e.target.value, 0, this.props.builder.width)
    ))
  };

  handleQuadY1Change = (e) => {
    this.props.dispatch(pointsActions.setQuadY1(
      this.props.path.id,
      this.props.point.id,
      keepInRange(e.target.value, 0, this.props.builder.height)
    ))
  };

  handleCubX1Change = (e) => {
    this.props.dispatch(pointsActions.setCubX1(
      this.props.path.id,
      this.props.point.id,
      keepInRange(e.target.value, 0, this.props.builder.width)
    ))
  };

  handleCubY1Change = (e) => {
    this.props.dispatch(pointsActions.setCubY1(
      this.props.path.id,
      this.props.point.id,
      keepInRange(e.target.value, 0, this.props.builder.height)
    ))
  };

  handleCubX2Change = (e) => {
    this.props.dispatch(pointsActions.setCubX2(
      this.props.path.id,
      this.props.point.id,
      keepInRange(e.target.value, 0, this.props.builder.width)
    ))
  };

  handleCubY2Change = (e) => {
    this.props.dispatch(pointsActions.setCubY2(
      this.props.path.id,
      this.props.point.id,
      keepInRange(e.target.value, 0, this.props.builder.height)
    ))
  };

  handleSmoothX2Change = (e) => {
    this.props.dispatch(pointsActions.setSmoothX2(
      this.props.path.id,
      this.props.point.id,
      keepInRange(e.target.value, 0, this.props.builder.width)
    ))
  };

  handleSmoothY2Change = (e) => {
    this.props.dispatch(pointsActions.setSmoothY2(
      this.props.path.id,
      this.props.point.id,
      keepInRange(e.target.value, 0, this.props.builder.height)
    ))
  };

  handleArcRXChange = (e) => {
    this.props.dispatch(pointsActions.setArcRX(
      this.props.path.id,
      this.props.point.id,
      keepInRange(e.target.value, 0, this.props.builder.width)
    ))
  };

  handleArcRYChange = (e) => {
    this.props.dispatch(pointsActions.setArcRY(
      this.props.path.id,
      this.props.point.id,
      keepInRange(e.target.value, 0, this.props.builder.height)
    ))
  };

  handleArcRotChange = (e) => {
    this.props.dispatch(pointsActions.setArcRot(
      this.props.path.id,
      this.props.point.id,
      keepInRange(e.target.value, 0, 360)
    ))
  };

  handleArcLargeChange = (e) => {
    this.props.dispatch(pointsActions.setArcLarge(
      this.props.path.id,
      this.props.point.id,
      e.target.checked
    ))
  };

  handleArcSweepChange = (e) => {
    this.props.dispatch(pointsActions.setArcSweep(
      this.props.path.id,
      this.props.point.id,
      e.target.checked
    ))
  };

  handleRemoveClick = (e) => {
    this.props.dispatch(pointsActions.removePoint(
      this.props.path.id,
      this.props.point.id
    ))
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

    let prevCode

    if (Object.keys(previousPoint).length > 0) {
      prevCode = previousPoint.code.toLowerCase()
    }

    return (
      <div className="ad-SidebarPoint">
        <div className="ad-SidebarPoint-module">
          { /* Point general settings */ }

          { prevCode && (
            <Settings>
              <Setting>
                <Choices>
                  <Choice
                    value="M"
                    checked={ code === "m" }
                    onChange={ this.handleTypeChange }>
                    M
                  </Choice>

                  <Choice
                    value="L"
                    checked={ code === "l" }
                    onChange={ this.handleTypeChange }>
                    L
                  </Choice>

                  <Choice
                    value="Q"
                    checked={ code === "q" }
                    onChange={ this.handleTypeChange }>
                    Q
                  </Choice>

                  { (prevCode === "q" || prevCode === "t") && (
                    <Choice
                      value="T"
                      checked={ code === "t" }
                      onChange={ this.handleTypeChange }>
                      T
                    </Choice>
                  ) }

                  <Choice
                    value="C"
                    checked={ code === "c" }
                    onChange={ this.handleTypeChange }>
                    C
                  </Choice>

                  { (prevCode === "c" || prevCode === "s") && (
                    <Choice
                      value="S"
                      checked={ code === "s" }
                      onChange={ this.handleTypeChange }>
                      S
                    </Choice>
                  ) }

                  <Choice
                    value="A"
                    checked={ code === "a" }
                    onChange={ this.handleTypeChange }>
                    A
                  </Choice>
                </Choices>
              </Setting>
            </Settings>
          ) }

          <Settings>
            <Setting label="Point X position">
              <Range
                min={ 0 }
                max={ builder.width }
                step={ step }
                value={ point.x }
                onChange={ this.handleXPositionChange } />
            </Setting>
          </Settings>

          <Settings>
            <Setting label="Point Y position">
              <Range
                min={ 0 }
                max={ builder.height }
                step={ step }
                value={ point.y }
                onChange={ this.handleYPositionChange } />
            </Setting>
          </Settings>

          { /* Quadratic curve settings */ }

          { code === "q" && (
            <Settings>
              <Setting label="Anchor X position">
                <Range
                  min={ 0 }
                  max={ builder.width }
                  step={ step }
                  value={ point.parameters.x1 }
                  onChange={ this.handleQuadX1Change } />
              </Setting>
            </Settings>
          ) }

          { code === "q" && (
            <Settings>
              <Setting label="Anchor Y position">
                <Range
                  min={ 0 }
                  max={ builder.height }
                  step={ step }
                  value={ point.parameters.y1 }
                  onChange={ this.handleQuadY1Change } />
              </Setting>
            </Settings>
          ) }

          { /* Cubic curve settings */ }

          { code === "c" && (
            <Settings>
              <Setting label="First anchor X position">
                <Range
                  min={ 0 }
                  max={ builder.width }
                  step={ step }
                  value={ point.parameters.x1 }
                  onChange={ this.handleCubX1Change } />
              </Setting>
            </Settings>
          ) }

          { code === "c" && (
            <Settings>
              <Setting label="First anchor Y position">
                <Range
                  min={ 0 }
                  max={ builder.height }
                  step={ step }
                  value={ point.parameters.y1 }
                  onChange={ this.handleCubY1Change } />
              </Setting>
            </Settings>
          ) }

          { code === "c" && (
            <Settings>
              <Setting label="Second anchor X position">
                <Range
                  min={ 0 }
                  max={ builder.width }
                  step={ step }
                  value={ point.parameters.x2 }
                  onChange={ this.handleCubX2Change } />
              </Setting>
            </Settings>
          ) }

          { code === "c" && (
            <Settings>
              <Setting label="Second anchor Y position">
                <Range
                  min={ 0 }
                  max={ builder.height }
                  step={ step }
                  value={ point.parameters.y2 }
                  onChange={ this.handleCubY2Change } />
              </Setting>
            </Settings>
          ) }

          { /* Smooth cubic curve settings */ }

          { code === "s" && (
            <Settings>
              <Setting label="Anchor X position">
                <Range
                  min={ 0 }
                  max={ builder.width }
                  step={ step }
                  value={ point.parameters.x2 }
                  onChange={ this.handleSmoothX2Change } />
              </Setting>
            </Settings>
          ) }

          { code === "s" && (
            <Settings>
              <Setting label="Anchor Y position">
                <Range
                  min={ 0 }
                  max={ builder.height }
                  step={ step }
                  value={ point.parameters.y2 }
                  onChange={ this.handleSmoothY2Change } />
              </Setting>
            </Settings>
          ) }

          { /* Arc settings */ }

          { code === "a" && (
            <Settings>
              <Setting label="X Radius">
                <Range
                  min={ 0 }
                  max={ builder.width }
                  step={ step }
                  value={ point.parameters.rx }
                  onChange={ this.handleArcRXChange } />
              </Setting>
            </Settings>
          ) }

          { code === "a" && (
            <Settings>
              <Setting label="Y Radius">
                <Range
                  min={ 0 }
                  max={ builder.height }
                  step={ step }
                  value={ point.parameters.ry }
                  onChange={ this.handleArcRYChange } />
              </Setting>
            </Settings>
          ) }

          { code === "a" && (
            <Settings>
              <Setting label="X Axis Rotation">
                <Range
                  min={ 0 }
                  max={ 360 }
                  step={ 1 }
                  value={ point.parameters.xAxisRotation }
                  onChange={ this.handleArcRotChange } />
              </Setting>
            </Settings>
          ) }

          { code === "a" && (
            <Settings>
              <Setting label="Large arc">
                <Checkbox
                  checked={ point.parameters.largeArc }
                  onChange={ this.handleArcLargeChange } />
              </Setting>

              <Setting label="Sweep">
                <Checkbox
                  checked={ point.parameters.sweep }
                  onChange={ this.handleArcSweepChange } />
              </Setting>
            </Settings>
          ) }
        </div>

        <div className="ad-SidebarPoint-actions">
          { prevCode && (
            <Button
              type="delete"
              onClick={ this.handleRemoveClick }>
              Remove point
            </Button>
          ) }
        </div>
      </div>
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
  const { builder, paths } = state
  const path = paths.filter(({ isActive }) => isActive)[0]

  let point = {}, previousPoint = {}

  path.points.forEach((p, i, pts) => {
    if (p.isActive) {
      point = p

      if (i > 0) {
        previousPoint = pts[i - 1]
      }
    }
  })

  return {
    builder,
    path,
    point,
    previousPoint,
  }
})(SidebarPoint)
