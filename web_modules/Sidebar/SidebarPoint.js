import React, { Component, PropTypes } from "react"
import { connect } from "react-redux"
import Button from "Button"
import Settings from "Settings"
import Setting from "Settings/Setting"
import Range from "Range"
import Choices from "Choices"
import Choice from "Choices/Choice"
import Checkbox from "Checkbox"

import {
  setPointCode,
  setPointX,
  setPointY,
  activatePoint,
  setPointParameters,
  removePoint,
} from "../../src/actions/points"

function getDefaultParameters(code, point, previousPoint) {
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

const mapStateToProps = (state) => {
  const { builder, points } = state
  const { paths, pathsById } = state.paths
  const activePathId = paths.filter((id) => pathsById[id].isActive)[0]
  const activePath = pathsById[activePathId]

  let previousPoint = {}

  const point = activePath.points.reduce(
    (acc, pointId, index, pts) => {
      if (points[pointId].isActive) {
        previousPoint = index > 0 ? points[pts[index - 1]]
        return points[pointId]
      }

      return acc
    },
    {}
  )

  return {
    builder,
    activePath,
    point,
    previousPoint,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onCodeChange: (pointId, code, parameters) =>
      dispatch(setPointCode(pointId, code, parameters)),
    onXPositionChange: (pointId, x) =>
      dispatch(setPointX(pointId, x)),
    onYPositionChange: (pointId, y) =>
      dispatch(setPointY(pointId, y)),
    onActiveChange: (pathId, pointId) =>
      dispatch(activatePoint(pathId, pointId)),
    onParametersChange: (pointId, parameters) =>
      dispatch(setPointParameters(pointId, parameters)),
    onRemoveClick: (pathId, pointId) =>
      dispatch(removePoint(pathId, pointId)),
  }
}

class SidebarPoint extends Component {
  handleCodeChange = (e) => {
    const { point, previousPoint } = this.props

    this.props.onCodeChange(
      point.id,
      e.target.value,
      getDefaultParameters(e.target.value, point, previousPoint)
    )
  };

  handleXPositionChange = (e) => {
    const { builder, point } = this.props

    this.props.onXPositionChange(
      point.id,
      keepInRange(e.target.value, 0, builder.width)
    )
  };

  handleYPositionChange = (e) => {
    const { builder, point } = this.props

    this.props.onYPositionChange(
      point.id,
      keepInRange(e.target.value, 0, builder.height)
    )
  };

  handleX1Change = (e) => {
    const { builder, point } = this.props

    this.props.onParametersChange(point.id, {
      ...point.parameters,
      x1: keepInRange(e.target.value, 0, builder.width),
    })
  };

  handleY1Change = (e) => {
    const { builder, point } = this.props

    this.props.onParametersChange(point.id, {
      ...point.parameters,
      y1: keepInRange(e.target.value, 0, builder.height),
    })
  };

  handleX2Change = (e) => {
    const { builder, point } = this.props

    this.props.onParametersChange(point.id, {
      ...point.parameters,
      x2: keepInRange(e.target.value, 0, builder.width),
    })
  };

  handleY2Change = (e) => {
    const { builder, point } = this.props

    this.props.onParametersChange(point.id, {
      ...point.parameters,
      y2: keepInRange(e.target.value, 0, builder.height),
    })
  };

  handleRXChange = (e) => {
    const { builder, point } = this.props

    this.props.onParametersChange(point.id, {
      ...point.parameters,
      rx: keepInRange(e.target.value, 0, builder.width),
    })
  };

  handleRYChange = (e) => {
    const { builder, point } = this.props

    this.props.onParametersChange(point.id, {
      ...point.parameters,
      ry: keepInRange(e.target.value, 0, builder.height),
    })
  };

  handleRotChange = (e) => {
    const { point } = this.props

    this.props.onParametersChange(point.id, {
      ...point.parameters,
      xAxisRotation: keepInRange(e.target.value, 0, 360),
    })
  };

  handleLargeChange = (e) => {
    const { point } = this.props

    this.props.onParametersChange(point.id, {
      ...point.parameters,
      largeArc: e.target.checked,
    })
  };

  handleSweepChange = (e) => {
    const { point } = this.props

    this.props.onParametersChange(point.id, {
      ...point.parameters,
      sweep: e.target.checked,
    })
  };

  handleRemoveClick = (e) => {
    const { activePath, point, previousPoint } = this.props

    // active the previous point
    this.props.onActiveChange(activePath.id, previousPoint.id)
    // then remove the point
    this.props.onRemoveClick(activePath.id, point.id)
  };

  render() {
    const { builder, point, previousPoint } = this.props
    const step = builder.grid.snapToGrid ? builder.grid.size : 1
    const code = point.code.toLowerCase()
    const prevCode = previousPoint.code && previousPoint.code.toLowerCase()

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
                    onChange={ this.handleCodeChange }>
                    M
                  </Choice>

                  <Choice
                    value="L"
                    checked={ code === "l" }
                    onChange={ this.handleCodeChange }>
                    L
                  </Choice>

                  <Choice
                    value="Q"
                    checked={ code === "q" }
                    onChange={ this.handleCodeChange }>
                    Q
                  </Choice>

                  { (prevCode === "q" || prevCode === "t") && (
                    <Choice
                      value="T"
                      checked={ code === "t" }
                      onChange={ this.handleCodeChange }>
                      T
                    </Choice>
                  ) }

                  <Choice
                    value="C"
                    checked={ code === "c" }
                    onChange={ this.handleCodeChange }>
                    C
                  </Choice>

                  { (prevCode === "c" || prevCode === "s") && (
                    <Choice
                      value="S"
                      checked={ code === "s" }
                      onChange={ this.handleCodeChange }>
                      S
                    </Choice>
                  ) }

                  <Choice
                    value="A"
                    checked={ code === "a" }
                    onChange={ this.handleCodeChange }>
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
                  onChange={ this.handleX1Change } />
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
                  onChange={ this.handleY1Change } />
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
                  onChange={ this.handleX1Change } />
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
                  onChange={ this.handleY1Change } />
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
                  onChange={ this.handleX2Change } />
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
                  onChange={ this.handleY2Change } />
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
                  onChange={ this.handleX2Change } />
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
                  onChange={ this.handleY2Change } />
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
                  onChange={ this.handleRXChange } />
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
                  onChange={ this.handleRYChange } />
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
                  onChange={ this.handleRotChange } />
              </Setting>
            </Settings>
          ) }

          { code === "a" && (
            <Settings>
              <Setting label="Large arc">
                <Checkbox
                  checked={ point.parameters.largeArc }
                  onChange={ this.handleLargeChange } />
              </Setting>

              <Setting label="Sweep">
                <Checkbox
                  checked={ point.parameters.sweep }
                  onChange={ this.handleSweepChange } />
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
  onCodeChange: PropTypes.func.isRequired,
  onXPositionChange: PropTypes.func.isRequired,
  onYPositionChange: PropTypes.func.isRequired,
  onActiveChange: PropTypes.func.isRequired,
  onParametersChange: PropTypes.func.isRequired,
  onRemoveClick: PropTypes.func.isRequired,
  builder: PropTypes.object.isRequired,
  activePath: PropTypes.object.isRequired,
  point: PropTypes.object.isRequired,
  previousPoint: PropTypes.object.isRequired,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SidebarPoint)
