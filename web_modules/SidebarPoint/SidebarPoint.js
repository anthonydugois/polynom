import "./styles"

import React, { Component, PropTypes } from "react"
import Hint from "Hint"
import { SidebarPanel, SidebarModule } from "Sidebar"
import SidebarPointCode from "./SidebarPointCode"
import SidebarPointPosition from "./SidebarPointPosition"
import SidebarPointQ from "./SidebarPointQ"
import SidebarPointC from "./SidebarPointC"
import SidebarPointS from "./SidebarPointS"
import SidebarPointA from "./SidebarPointA"
import { MdTune } from "react-icons/lib/md"

class SidebarPoint extends Component {
  handleRemoveClick = () => {
    this.props.onRemoveClick(this.props.activePoints)
  };

  render() {
    const {
      project,
      gridStep,
      activePoints,
      point,
      previousPoint,
    } = this.props

    const code = point && point.code.toLowerCase()
    const prevCode = previousPoint && previousPoint.code.toLowerCase()

    return (
      <SidebarPanel>
        { activePoints.length === 1 ? (
          <SidebarModule style={{ padding: ".75rem 0" }}>
            { /* Point code */ }
            { prevCode && (
              <SidebarPointCode
                point={ point }
                previousPoint={ previousPoint }
                onCodeChange={ this.props.onCodeChange } />
            ) }

            { /* Point position */ }
            <SidebarPointPosition
              project={ project }
              gridStep={ gridStep }
              point={ point }
              onXPositionChange={ this.props.onXPositionChange }
              onYPositionChange={ this.props.onYPositionChange } />

            { /* Quadratic curve settings */ }
            { code === "q" && (
              <SidebarPointQ
                project={ project }
                gridStep={ gridStep }
                point={ point }
                onParamsChange={ this.props.onParamsChange } />
            ) }

            { /* Cubic curve settings */ }
            { code === "c" && (
              <SidebarPointC
                project={ project }
                gridStep={ gridStep }
                point={ point }
                onParamsChange={ this.props.onParamsChange } />
            ) }

            { /* Smooth cubic curve settings */ }
            { code === "s" && (
              <SidebarPointS
                project={ project }
                gridStep={ gridStep }
                point={ point }
                onParamsChange={ this.props.onParamsChange } />
            ) }

            { /* Arc settings */ }
            { code === "a" && (
              <SidebarPointA
                project={ project }
                gridStep={ gridStep }
                point={ point }
                onParamsChange={ this.props.onParamsChange } />
            ) }
          </SidebarModule>
        ) : (
          <SidebarModule style={{ padding: "1.25rem" }}>
            <Hint
              icon={ <MdTune size="2rem" /> }
              title="No selected point">
              Select a point to edit manually its parameters.
            </Hint>
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
  project: PropTypes.object.isRequired,
  gridStep: PropTypes.number.isRequired,
  activePoints: PropTypes.array.isRequired,
  point: PropTypes.object,
  previousPoint: PropTypes.object,
}

export default SidebarPoint
