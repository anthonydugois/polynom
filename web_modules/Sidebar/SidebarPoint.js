import React, { Component, PropTypes } from "react"
import { connect } from "react-redux"
import Settings from "Settings"
import Setting from "Settings/Setting"
import Choices from "Choices"
import Choice from "Choices/Choice"

import * as pointsActions from "../../src/actions/points"

class SidebarPoint extends Component {
  handlePointTypeChange = (e) => {
    const {
      dispatch,
      path,
      point,
    } = this.props

    dispatch(pointsActions.setPointCode(path.id, point.id, e.target.value))
  };

  render() {
    const {
      path,
      point,
    } = this.props

    const pointCode = point.code.toLowerCase()

    return (
      <Settings>
        <Setting>
          <Choices>
            <Choice
              name="type"
              value="M"
              checked={ pointCode === "m" }
              onChange={ this.handlePointTypeChange }>
              Move
            </Choice>

            <Choice
              name="type"
              value="L"
              checked={ pointCode === "l" }
              onChange={ this.handlePointTypeChange }>
              Line
            </Choice>

            <Choice
              name="type"
              value="Q"
              checked={ pointCode === "q" }
              onChange={ this.handlePointTypeChange }>
              Quad
            </Choice>

            <Choice
              name="type"
              value="C"
              checked={ pointCode === "c" }
              onChange={ this.handlePointTypeChange }>
              Cub
            </Choice>

            <Choice
              name="type"
              value="A"
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
  point: PropTypes.object.isRequired,
}

export default connect((state) => {
  const path = state.paths.filter(({ isActive }) => isActive)[0]
  const point = path.points.filter(({ isActive }) => isActive)[0]

  return { path, point }
})(SidebarPoint)
