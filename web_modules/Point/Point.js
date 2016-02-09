import React, { Component, PropTypes } from "react"
import cx from "classnames"
import { APP_CTRL } from "../../src/constants/KeyActionTypes"
import * as ObjectTypes from "../../src/constants/ObjectTypes"
import "./styles"

class Point extends Component {
  handlePointMouseDown = () => {
    if (this.props.keyActions.includes(APP_CTRL)) {
      this.props.onPointAddActive()
    } else {
      this.props.onPointActive()
    }
  };

  handleMainMouseDown = (e) => {
    const { point } = this.props
    this.props.onMouseDown(e, point.id, ObjectTypes.POINT_MAIN)
  };

  handleAnchorQuadMouseDown = (e) => {
    const { point } = this.props
    this.props.onMouseDown(e, point.id, ObjectTypes.POINT_ANCHOR_QUAD)
  };

  renderPoint(point) {
    const [w, h] = [10, 10]

    return (
      <rect
        className="ad-Point-main"
        x={ point.x - w / 2 }
        y={ point.y - h / 2 }
        width={ w }
        height={ h }
        onMouseDown={ this.handleMainMouseDown } />
    )
  }

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
          r={ 4 }
          onMouseDown={ this.handleAnchorQuadMouseDown } />
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
      <g
        className={ cx("ad-Point", { "is-active": point.isActive }) }
        onMouseDown={ this.handlePointMouseDown }>
        { this.renderPoint(point) }

        { /* If there is a Bezier curve, render anchors */ }
        { (code === "q") &&
            this.renderQuadraticAnchors(point, previousPoint) }
        { (code === "c" || code === "s") &&
            this.renderCubicAnchors(point, previousPoint) }
      </g>
    )
  }
}

Point.propTypes = {
  onPointAddActive: PropTypes.func.isRequired,
  onPointActive: PropTypes.func.isRequired,
  onMouseDown: PropTypes.func.isRequired,
  keyActions: PropTypes.array.isRequired,
  path: PropTypes.object.isRequired,
  point: PropTypes.object.isRequired,
  previousPoint: PropTypes.object,
}

export default Point
