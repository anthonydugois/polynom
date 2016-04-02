import React, { Component, PropTypes } from "react"
import Settings, { Setting } from "Settings"
import Range from "Range"
import { clamp } from "../../src/utils"

class SidebarPointS extends Component {
  handleX2Change = (e) => {
    const { project, point } = this.props
    const x2 = clamp(parseInt(e.target.value), 0, project.width)

    this.props.onParamsChange(point.id, { ...point.parameters, x2 })
  };

  handleY2Change = (e) => {
    const { project, point } = this.props
    const y2 = clamp(parseInt(e.target.value), 0, project.height)

    this.props.onParamsChange(point.id, { ...point.parameters, y2 })
  };

  render() {
    const { project, gridStep, point } = this.props

    return (
      <div>
        <Settings>
          <Setting label="Second anchor X position">
            <Range
              min={ 0 }
              max={ project.width }
              step={ gridStep }
              value={ point.parameters.x2 }
              onChange={ this.handleX2Change } />
          </Setting>
        </Settings>

        <Settings>
          <Setting label="Second anchor Y position">
            <Range
              min={ 0 }
              max={ project.height }
              step={ gridStep }
              value={ point.parameters.y2 }
              onChange={ this.handleY2Change } />
          </Setting>
        </Settings>
      </div>
    )
  }
}

SidebarPointS.propTypes = {
  onParamsChange: PropTypes.func.isRequired,
  project: PropTypes.object.isRequired,
  gridStep: PropTypes.number.isRequired,
  point: PropTypes.object.isRequired,
}

export default SidebarPointS
