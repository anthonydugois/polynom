import React, { Component, PropTypes } from "react"
import { connect } from "react-redux"
import Settings from "Settings"
import Setting from "Settings/Setting"
import Choices from "Choices"
import Choice from "Choices/Choice"

class SidebarPoint extends Component {
  handlePointTypeChange = (e) => {
    console.log(e)
  };

  render() {
    const { path } = this.props

    const point = path.points.filter(({ isActive }) => isActive)[0]
    const pointCode = point.parameters.code.toLowerCase()

    return (
      <Settings>
        <Setting>
          <Choices>
            <Choice
              name="type"
              value="m"
              checked={ pointCode === "m" }
              onChange={ this.handlePointTypeChange }>
              Move
            </Choice>

            <Choice
              name="type"
              value="l"
              checked={ pointCode === "l" }
              onChange={ this.handlePointTypeChange }>
              Line
            </Choice>

            <Choice
              name="type"
              value="q"
              checked={ pointCode === "q" }
              onChange={ this.handlePointTypeChange }>
              Quad
            </Choice>

            <Choice
              name="type"
              value="c"
              checked={ pointCode === "c" }
              onChange={ this.handlePointTypeChange }>
              Cub
            </Choice>

            <Choice
              name="type"
              value="a"
              checked={ pointCode === "a" }
              onChange={ this.handlePointTypeChange }>
              Arc
            </Choice>
          </Choices>
        </Setting>
      </Settings>
    )
  }
}

SidebarPoint.propTypes = {
  dispatch: PropTypes.func.isRequired,
  path: PropTypes.object.isRequired,
}

export default connect((state) => ({
  path: state.paths.filter(({ isActive }) => isActive)[0],
}))(SidebarPoint)
