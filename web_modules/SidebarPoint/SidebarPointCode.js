import React, { Component, PropTypes } from "react"
import Settings from "Settings"
import Setting from "Settings/Setting"
import Choices from "Choices"
import Choice from "Choices/Choice"

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

class SidebarPointCode extends Component {
  handleCodeChange = (e) => {
    const { point, previousPoint } = this.props
    const code = e.target.value
    const parameters = getDefaultParameters(code, point, previousPoint)

    this.props.onCodeChange(point.id, code, parameters)
  };

  render() {
    const { point, previousPoint } = this.props
    const code = point && point.code.toLowerCase()
    const prevCode = previousPoint && previousPoint.code.toLowerCase()

    return (
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
    )
  }
}

SidebarPointCode.propTypes = {
  onCodeChange: PropTypes.func.isRequired,
  point: PropTypes.object.isRequired,
  previousPoint: PropTypes.object.isRequired,
}

export default SidebarPointCode
