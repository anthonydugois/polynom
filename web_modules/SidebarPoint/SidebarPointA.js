import React, { Component, PropTypes } from "react"
import Settings from "Settings"
import Setting from "Settings/Setting"
import Range from "Range"
import Checkbox from "Checkbox"
import inRange from "../../src/utils/inRange"

class SidebarPointA extends Component {
  handleRXChange = (e) => {
    const { project, point } = this.props
    const rx = inRange(parseInt(e.target.value), project.width)

    this.props.onParamsChange(point.id, { ...point.parameters, rx })
  };

  handleRYChange = (e) => {
    const { project, point } = this.props
    const ry = inRange(parseInt(e.target.value), project.height)

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

  render() {
    const { project, gridStep, point } = this.props

    return (
      <div>
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
      </div>
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
