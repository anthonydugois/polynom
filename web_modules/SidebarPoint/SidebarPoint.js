import React, { Component, PropTypes } from "react"
import SidebarPanel from "Sidebar/SidebarPanel"
import SidebarModule from "Sidebar/SidebarModule"
import SidebarPointCode from "./SidebarPointCode"
import SidebarPointPosition from "./SidebarPointPosition"
import SidebarPointQ from "./SidebarPointQ"
import SidebarPointC from "./SidebarPointC"
import SidebarPointS from "./SidebarPointS"
import SidebarPointA from "./SidebarPointA"
import "./styles"

class SidebarPoint extends Component {
  handleRemoveClick = () => {
    this.props.onRemoveClick(this.props.activePoints)
  };

  render() {
    const {
      builder,
      gridStep,
      point,
      previousPoint,
    } = this.props

    const code = point && point.code.toLowerCase()
    const prevCode = previousPoint && previousPoint.code.toLowerCase()

    return (
      <SidebarPanel>
        { code && (
          <SidebarModule>
            { /* Point code */ }
            { prevCode && (
              <SidebarPointCode
                point={ point }
                previousPoint={ previousPoint }
                onCodeChange={ this.props.onCodeChange }
                onParamsChange={ this.props.onParamsChange } />
            ) }

            { /* Point position */ }
            <SidebarPointPosition
              builder={ builder }
              gridStep={ gridStep }
              point={ point }
              onXPositionChange={ this.props.onXPositionChange }
              onYPositionChange={ this.props.onYPositionChange } />

            { /* Quadratic curve settings */ }
            { code === "q" && (
              <SidebarPointQ
                builder={ builder }
                gridStep={ gridStep }
                point={ point }
                onParamsChange={ this.props.onParamsChange } />
            ) }

            { /* Cubic curve settings */ }
            { code === "c" && (
              <SidebarPointC
                builder={ builder }
                gridStep={ gridStep }
                point={ point }
                onParamsChange={ this.props.onParamsChange } />
            ) }

            { /* Smooth cubic curve settings */ }
            { code === "s" && (
              <SidebarPointS
                builder={ builder }
                gridStep={ gridStep }
                point={ point }
                onParamsChange={ this.props.onParamsChange } />
            ) }

            { /* Arc settings */ }
            { code === "a" && (
              <SidebarPointA
                builder={ builder }
                gridStep={ gridStep }
                point={ point }
                onParamsChange={ this.props.onParamsChange } />
            ) }
          </SidebarModule>
        ) }
      </SidebarPanel>
    )
  }
}

SidebarPoint.propTypes = {
  onCodeChange: PropTypes.func.isRequired,
  onXPositionChange: PropTypes.func.isRequired,
  onYPositionChange: PropTypes.func.isRequired,
  onParamsChange: PropTypes.func.isRequired,
  builder: PropTypes.object.isRequired,
  gridStep: PropTypes.number.isRequired,
  activePoints: PropTypes.array.isRequired,
  point: PropTypes.object,
  previousPoint: PropTypes.object,
}

export default SidebarPoint
