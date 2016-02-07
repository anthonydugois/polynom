import React, { Component, PropTypes } from "react"
import Settings from "Settings"
import Setting from "Settings/Setting"
import Range from "Range"
import inRange from "../../src/utils/inRange"

class SidebarPointC extends Component {
  handleX1Change = (e) => {
    const { builder, point } = this.props
    const x1 = inRange(parseInt(e.target.value), builder.width)

    this.props.onParamsChange(point.id, { ...point.parameters, x1 })
  };

  handleY1Change = (e) => {
    const { builder, point } = this.props
    const y1 = inRange(parseInt(e.target.value), builder.height)

    this.props.onParamsChange(point.id, { ...point.parameters, y1 })
  };

  handleX2Change = (e) => {
    const { builder, point } = this.props
    const x2 = inRange(parseInt(e.target.value), builder.width)

    this.props.onParamsChange(point.id, { ...point.parameters, x2 })
  };

  handleY2Change = (e) => {
    const { builder, point } = this.props
    const y2 = inRange(parseInt(e.target.value), builder.height)

    this.props.onParamsChange(point.id, { ...point.parameters, y2 })
  };

  render() {
    const { builder, gridStep, point } = this.props

    return (
      <div>
        <Settings>
          <Setting label="First anchor X position">
            <Range
              min={ 0 }
              max={ builder.width }
              step={ gridStep }
              value={ point.parameters.x1 }
              onChange={ this.handleX1Change } />
          </Setting>
        </Settings>

        <Settings>
          <Setting label="First anchor Y position">
            <Range
              min={ 0 }
              max={ builder.height }
              step={ gridStep }
              value={ point.parameters.y1 }
              onChange={ this.handleY1Change } />
          </Setting>
        </Settings>

        <Settings>
          <Setting label="Second anchor X position">
            <Range
              min={ 0 }
              max={ builder.width }
              step={ gridStep }
              value={ point.parameters.x2 }
              onChange={ this.handleX2Change } />
          </Setting>
        </Settings>

        <Settings>
          <Setting label="Second anchor Y position">
            <Range
              min={ 0 }
              max={ builder.height }
              step={ gridStep }
              value={ point.parameters.y2 }
              onChange={ this.handleY2Change } />
          </Setting>
        </Settings>
      </div>
    )
  }
}

SidebarPointC.propTypes = {
  onParamsChange: PropTypes.func.isRequired,
  builder: PropTypes.object.isRequired,
  gridStep: PropTypes.number.isRequired,
  point: PropTypes.object.isRequired,
}

export default SidebarPointC
