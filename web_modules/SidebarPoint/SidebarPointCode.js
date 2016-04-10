import React, { Component, PropTypes } from "react"
import Settings, { Setting } from "Settings"
import Choices, { Choice } from "Choices"
import { getDefaultParameters } from "../../src/utils"

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
            <Choice
              value="T"
              checked={ code === "t" }
              onChange={ this.handleCodeChange }>
              T
            </Choice>
            <Choice
              value="C"
              checked={ code === "c" }
              onChange={ this.handleCodeChange }>
              C
            </Choice>
            <Choice
              value="S"
              checked={ code === "s" }
              onChange={ this.handleCodeChange }>
              S
            </Choice>
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
