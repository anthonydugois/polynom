import React, { Component, PropTypes } from "react"
import Settings from "Settings"
import Setting from "Settings/Setting"
import Range from "Range"
import inRange from "../../src/utils/inRange"

class SidebarPointPosition extends Component {
  handleXPositionChange = (e) => {
    const { builder, point } = this.props
    const x = inRange(parseInt(e.target.value), builder.width)

    this.props.onXPositionChange(point.id, x)
  };

  handleYPositionChange = (e) => {
    const { builder, point } = this.props
    const y = inRange(parseInt(e.target.value), builder.height)

    this.props.onYPositionChange(point.id, y)
  };

  render() {
    const { builder, gridStep, point } = this.props

    return (
      <div>
        <Settings>
          <Setting label="Point X position">
            <Range
              min={ 0 }
              max={ builder.width }
              step={ gridStep }
              value={ point.x }
              onChange={ this.handleXPositionChange } />
          </Setting>
        </Settings>

        <Settings>
          <Setting label="Point Y position">
            <Range
              min={ 0 }
              max={ builder.height }
              step={ gridStep }
              value={ point.y }
              onChange={ this.handleYPositionChange } />
          </Setting>
        </Settings>
      </div>
    )
  }
}

SidebarPointPosition.propTypes = {
  onXPositionChange: PropTypes.func.isRequired,
  onYPositionChange: PropTypes.func.isRequired,
  builder: PropTypes.object.isRequired,
  gridStep: PropTypes.number.isRequired,
  point: PropTypes.object.isRequired,
}

export default SidebarPointPosition
