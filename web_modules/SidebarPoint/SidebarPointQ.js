import React, { Component, PropTypes } from "react"
import Settings from "Settings"
import Setting from "Settings/Setting"
import Range from "Range"
import inRange from "../../src/utils/inRange"

class SidebarPointQ extends Component {
  handleX1Change = (e) => {
    const { project, point } = this.props
    const x1 = inRange(parseInt(e.target.value), project.width)

    this.props.onParamsChange(point.id, { ...point.parameters, x1 })
  };

  handleY1Change = (e) => {
    const { project, point } = this.props
    const y1 = inRange(parseInt(e.target.value), project.height)

    this.props.onParamsChange(point.id, { ...point.parameters, y1 })
  };

  render() {
    const { project, gridStep, point } = this.props

    return (
      <div>
        <Settings>
          <Setting label="Anchor X position">
            <Range
              min={ 0 }
              max={ project.width }
              step={ gridStep }
              value={ point.parameters.x1 }
              onChange={ this.handleX1Change } />
          </Setting>
        </Settings>

        <Settings>
          <Setting label="Anchor Y position">
            <Range
              min={ 0 }
              max={ project.height }
              step={ gridStep }
              value={ point.parameters.y1 }
              onChange={ this.handleY1Change } />
          </Setting>
        </Settings>
      </div>
    )
  }
}

SidebarPointQ.propTypes = {
  onParamsChange: PropTypes.func.isRequired,
  project: PropTypes.object.isRequired,
  gridStep: PropTypes.number.isRequired,
  point: PropTypes.object.isRequired,
}

export default SidebarPointQ
