import React, { Component, PropTypes } from "react"
import Settings from "Settings"
import Setting from "Settings/Setting"
import Range from "Range"
import SidebarPointParameter from "./SidebarPointParameter"
import inRange from "../../src/utils/inRange"

class SidebarPointPosition extends Component {
  handleXPositionChange = (e) => {
    const { project, point } = this.props
    const x = inRange(parseInt(e.target.value), project.width)

    this.props.onXPositionChange(point.id, x)
  };

  handleYPositionChange = (e) => {
    const { project, point } = this.props
    const y = inRange(parseInt(e.target.value), project.height)

    this.props.onYPositionChange(point.id, y)
  };

  render() {
    const { project, gridStep, point } = this.props

    return (
      <SidebarPointParameter>
        <Settings>
          <Setting label="Point X position">
            <Range
              min={ 0 }
              max={ project.width }
              step={ gridStep }
              value={ point.x }
              onChange={ this.handleXPositionChange } />
          </Setting>
        </Settings>

        <Settings>
          <Setting label="Point Y position">
            <Range
              min={ 0 }
              max={ project.height }
              step={ gridStep }
              value={ point.y }
              onChange={ this.handleYPositionChange } />
          </Setting>
        </Settings>
      </SidebarPointParameter>
    )
  }
}

SidebarPointPosition.propTypes = {
  onXPositionChange: PropTypes.func.isRequired,
  onYPositionChange: PropTypes.func.isRequired,
  project: PropTypes.object.isRequired,
  gridStep: PropTypes.number.isRequired,
  point: PropTypes.object.isRequired,
}

export default SidebarPointPosition
