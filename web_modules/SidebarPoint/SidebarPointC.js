import React, { Component, PropTypes } from "react"
import Settings, { Setting } from "Settings"
import Range from "Range"
import { clamp } from "../../src/utils"

class SidebarPointC extends Component {
  handleX1Change = (e) => {
    const { project, point } = this.props
    const x1 = clamp(parseInt(e.target.value), 0, project.width)

    this.props.onParamsChange(point.id, { ...point.parameters, x1 })
  };

  handleY1Change = (e) => {
    const { project, point } = this.props
    const y1 = clamp(parseInt(e.target.value), 0, project.height)

    this.props.onParamsChange(point.id, { ...point.parameters, y1 })
  };

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
      <Settings title="Anchors position">
        <Setting label="X1">
          <Range
            min={ 0 }
            max={ project.width }
            step={ gridStep }
            value={ point.parameters.x1 }
            onChange={ this.handleX1Change } />
        </Setting>
        <Setting label="Y1">
          <Range
            min={ 0 }
            max={ project.height }
            step={ gridStep }
            value={ point.parameters.y1 }
            onChange={ this.handleY1Change } />
        </Setting>
        <Setting label="X2">
          <Range
            min={ 0 }
            max={ project.width }
            step={ gridStep }
            value={ point.parameters.x2 }
            onChange={ this.handleX2Change } />
        </Setting>
        <Setting label="Y2">
          <Range
            min={ 0 }
            max={ project.height }
            step={ gridStep }
            value={ point.parameters.y2 }
            onChange={ this.handleY2Change } />
        </Setting>
      </Settings>
    )
  }
}

SidebarPointC.propTypes = {
  onParamsChange: PropTypes.func.isRequired,
  project: PropTypes.object.isRequired,
  gridStep: PropTypes.number.isRequired,
  point: PropTypes.object.isRequired,
}

export default SidebarPointC
