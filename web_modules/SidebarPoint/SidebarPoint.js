import React, { Component, PropTypes } from "react"
import Button from "Button"
import Settings from "Settings"
import Setting from "Settings/Setting"
import Range from "Range"
import Choices from "Choices"
import Choice from "Choices/Choice"
import Checkbox from "Checkbox"
import "./styles"

function inRange(n, max) {
  if (isNaN(n) || n < 0) {
    return 0
  }

  if (n > max) {
    return max
  }

  return n
}

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

class SidebarPoint extends Component {
  handleCodeChange = (e) => {
    const { point, previousPoint } = this.props
    const code = e.target.value
    const parameters = getDefaultParameters(code, point, previousPoint)

    this.props.onCodeChange(point.id, code, parameters)
  };

  handleXPositionChange = (e) => {
    const { builder, point } = this.props
    const x = inRange(parseInt(e.target.value), builder.width)

    this.props.onXPositionChange(point.id, x)
  };

  handleYPositionChange = (e) => {
    const { builder, point } = this.props
    const y = inRange(parseInt(e.target.value), builder.height)

    this.props.onYPositionChange(point.id, y)
  };

  handleX1Change = (e) => {
    const { builder, point } = this.props
    const x1 = inRange(parseInt(e.target.value), builder.width)

    this.props.onParamsChange(point.id, { ...point.parameters, x1 })
  };

  handleY1Change = (e) => {
    const { builder, point } = this.props
    const y1 = inRange(parseInt(e.target.value), builder.height)

    this.props.onParamsChange(point.id, { ...point.parameters, y1 })
  };

  handleX2Change = (e) => {
    const { builder, point } = this.props
    const x2 = inRange(parseInt(e.target.value), builder.width)

    this.props.onParamsChange(point.id, { ...point.parameters, x2 })
  };

  handleY2Change = (e) => {
    const { builder, point } = this.props
    const y2 = inRange(parseInt(e.target.value), builder.height)

    this.props.onParamsChange(point.id, { ...point.parameters, y2 })
  };

  handleRXChange = (e) => {
    const { builder, point } = this.props
    const rx = inRange(parseInt(e.target.value), builder.width)

    this.props.onParamsChange(point.id, { ...point.parameters, rx })
  };

  handleRYChange = (e) => {
    const { builder, point } = this.props
    const ry = inRange(parseInt(e.target.value), builder.height)

    this.props.onParamsChange(point.id, { ...point.parameters, ry })
  };

  handleRotChange = (e) => {
    const { point } = this.props
    const xAxisRotation = inRange(parseInt(e.target.value), 360)

    this.props.onParamsChange(point.id, { ...point.parameters, xAxisRotation })
  };

  handleLargeChange = (e) => {
    const { point } = this.props
    const largeArc = e.target.checked

    this.props.onParamsChange(point.id, { ...point.parameters, largeArc })
  };

  handleSweepChange = (e) => {
    const { point } = this.props
    const sweep = e.target.checked

    this.props.onParamsChange(point.id, { ...point.parameters, sweep })
  };

  handleRemoveClick = () => {
    this.props.onRemoveClick(this.props.activePoints)
  };

  render() {
    const {
      builder,
      activePoints,
      point,
      previousPoint,
    } = this.props

    const step = builder.grid.snapToGrid ? builder.grid.size : 1
    let code, prevCode

    if (activePoints.length === 1) {
      code = point.code.toLowerCase()
      prevCode = previousPoint && previousPoint.code.toLowerCase()
    }

    return (
      <div className="ad-SidebarPoint">
        { activePoints.length === 1 && (
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
        ) }

        <div className="ad-SidebarPoint-actions">
          <Button
            type="delete"
            icon="delete"
            onClick={ this.handleRemoveClick }>
            Remove point
          </Button>
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
  onParamsChange: PropTypes.func.isRequired,
  onRemoveClick: PropTypes.func.isRequired,
  builder: PropTypes.object.isRequired,
  activePoints: PropTypes.array.isRequired,
  point: PropTypes.object,
  previousPoint: PropTypes.object,
}

export default SidebarPoint
