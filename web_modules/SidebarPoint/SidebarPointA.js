import React, { Component, PropTypes } from "react"
import Settings, { Setting } from "Settings"
import Range from "Range"
import Checkbox from "Checkbox"
import SidebarPointParameter from "./SidebarPointParameter"
import { clamp } from "../../src/utils"

class SidebarPointA extends Component {
  handleRXChange = (e) => {
    const { project, point } = this.props
    const rx = clamp(parseInt(e.target.value), 0, project.width)

    this.props.onParamsChange(point.id, { ...point.parameters, rx })
  };

  handleRYChange = (e) => {
    const { project, point } = this.props
    const ry = clamp(parseInt(e.target.value), 0, project.height)

    this.props.onParamsChange(point.id, { ...point.parameters, ry })
  };

  handleRotChange = (e) => {
    const { point } = this.props
    const xAxisRotation = clamp(parseInt(e.target.value), 0, 360)

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

  render() {
    const { project, gridStep, point } = this.props

    return (
      <SidebarPointParameter>
        <Settings>
          <Setting label="X Radius">
            <Range
              min={ 0 }
              max={ project.width }
              step={ gridStep }
              value={ point.parameters.rx }
              onChange={ this.handleRXChange } />
          </Setting>
        </Settings>

        <Settings>
          <Setting label="Y Radius">
            <Range
              min={ 0 }
              max={ project.height }
              step={ gridStep }
              value={ point.parameters.ry }
              onChange={ this.handleRYChange } />
          </Setting>
        </Settings>

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
      </SidebarPointParameter>
    )
  }
}

SidebarPointA.propTypes = {
  onParamsChange: PropTypes.func.isRequired,
  project: PropTypes.object.isRequired,
  gridStep: PropTypes.number.isRequired,
  point: PropTypes.object.isRequired,
}

export default SidebarPointA
