import React, { Component, PropTypes } from "react"
import cx from "classnames"
import { APP_CTRL } from "../../src/constants/KeyActionTypes"
import "./styles"

class Point extends Component {
  handlePointClick = () => {
    if (this.props.keyActions.includes(APP_CTRL)) {
      this.props.onPointCtrlClick()
    } else {
      this.props.onPointClick()
    }
  };

  handlePointMouseDown = (e) => {
    this.props.onPointMouseDown(e)
  };

  renderPoint = (point) => {
    return (
      <circle
        className="ad-Point-circle"
        cx={ point.x }
        cy={ point.y }
        r={ 6 }
        onClick={ this.handlePointClick }
        onMouseDown={ this.handlePointMouseDown } />
    )
  };

  renderQuadraticAnchors(point, previousPoint) {
    return (
      <g className="ad-Anchor">
        <line
          className="ad-Anchor-line"
          x1={ previousPoint.x }
          y1={ previousPoint.y }
          x2={ point.parameters.x1 }
          y2={ point.parameters.y1 } />

        <line
          className="ad-Anchor-line"
          x1={ point.parameters.x1 }
          y1={ point.parameters.y1 }
          x2={ point.x }
          y2={ point.y } />

        <circle
          className="ad-Anchor-point"
          cx={ point.parameters.x1 }
          cy={ point.parameters.y1 }
          r={ 4 } />
      </g>
    )
  }

  renderCubicAnchors(point, previousPoint) {
    const code = point.code.toLowerCase()

    return (
      <g className="ad-Anchor">
        { code === "c" && (
          <line
            className="ad-Anchor-line"
            x1={ previousPoint.x }
            y1={ previousPoint.y }
            x2={ point.parameters.x1 }
            y2={ point.parameters.y1 } />
        ) }

        <line
          className="ad-Anchor-line"
          x1={ point.x }
          y1={ point.y }
          x2={ point.parameters.x2 }
          y2={ point.parameters.y2 } />

        { code === "c" && (
          <circle
            className="ad-Anchor-point"
            cx={ point.parameters.x1 }
            cy={ point.parameters.y1 }
            r={ 4 } />
        ) }

        <circle
          className="ad-Anchor-point"
          cx={ point.parameters.x2 }
          cy={ point.parameters.y2 }
          r={ 4 } />
      </g>
    )
  }

  render() {
    const { point, previousPoint } = this.props
    const code = point.code.toLowerCase()

    return (
      <g className={ cx("ad-Point", { "is-active": point.isActive }) }>
        { this.renderPoint(point) }

        { /* if there is a Bezier curve, render anchors */ }
        { (code === "q") &&
            this.renderQuadraticAnchors(point, previousPoint) }
        { (code === "c" || code === "s") &&
            this.renderCubicAnchors(point, previousPoint) }
      </g>
    )
  }
}

Point.propTypes = {
  onPointCtrlClick: PropTypes.func.isRequired,
  onPointClick: PropTypes.func.isRequired,
  onPointMouseDown: PropTypes.func.isRequired,
  keyActions: PropTypes.array.isRequired,
  path: PropTypes.object.isRequired,
  point: PropTypes.object.isRequired,
  previousPoint: PropTypes.object,
}

export default Point
