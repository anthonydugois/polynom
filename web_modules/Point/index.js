import React, { Component, PropTypes } from "react"
import cx from "classnames"
import "./styles"

class Point extends Component {
  static propTypes = {
    point: PropTypes.object.isRequired,
    previousPoint: PropTypes.object,
  };

  renderPoint(point) {
    return (
      <circle
        className="ad-Point-circle"
        cx={ point.parameters.x }
        cy={ point.parameters.y }
        r={ 8 } />
    )
  }

  renderQuadraticAnchors(point, previousPoint) {
    const code = point.parameters.code.toLowerCase()
    const prevCode = previousPoint.parameters.code.toLowerCase()

    if (code === "q" || (code === "t" && prevCode !== "q")) {
      return (
        <g className="ad-Anchor">
          <line
            className="ad-Anchor-line"
            x1={ previousPoint.parameters.x }
            y1={ previousPoint.parameters.y }
            x2={ point.parameters.x1 }
            y2={ point.parameters.y1 } />

          <line
            className="ad-Anchor-line"
            x1={ point.parameters.x1 }
            y1={ point.parameters.y1 }
            x2={ point.parameters.x }
            y2={ point.parameters.y } />

          <circle
            className="ad-Anchor-point"
            cx={ point.parameters.x1 }
            cy={ point.parameters.y1 }
            r={ 6 } />
        </g>
      )
    }

    return null
  }

  renderCubicAnchors(point, previousPoint) {
    const code = point.parameters.code.toLowerCase()
    const prevCode = previousPoint.parameters.code.toLowerCase()

    if (code === "c" || code === "s") {
      return (
        <g className="ad-Anchor">
          { !(code === "s" && prevCode === "c") && (
            <line
              className="ad-Anchor-line"
              x1={ previousPoint.parameters.x }
              y1={ previousPoint.parameters.y }
              x2={ point.parameters.x1 }
              y2={ point.parameters.y1 } />
          ) }

          <line
            className="ad-Anchor-line"
            x1={ point.parameters.x }
            y1={ point.parameters.y }
            x2={ point.parameters.x2 }
            y2={ point.parameters.y2 } />

          { !(code === "s" && prevCode === "c") && (
            <circle
              className="ad-Anchor-point"
              cx={ point.parameters.x1 }
              cy={ point.parameters.y1 }
              r={ 6 } />
          ) }

          <circle
            className="ad-Anchor-point"
            cx={ point.parameters.x2 }
            cy={ point.parameters.y2 }
            r={ 6 } />
        </g>
      )
    }

    return null
  }

  render() {
    const {
      point,
      previousPoint,
    } = this.props

    return (
      <g className={ cx("ad-Point", { "is-active": point.isActive }) }>
        { this.renderPoint(point) }
        { previousPoint && this.renderQuadraticAnchors(point, previousPoint) }
        { previousPoint && this.renderCubicAnchors(point, previousPoint) }
      </g>
    )
  }
}

export default Point
