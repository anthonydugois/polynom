import React, { Component } from "react"
import cx from "classnames"

import Grid from "./Grid"
import Point from "./Point"
import Cubic from "./Cubic"
import Quadratic from "./Quadratic"

import "./styles"

class SVG extends Component {
    static propTypes = {
        w: React.PropTypes.number.isRequired,
        h: React.PropTypes.number.isRequired,
        path: React.PropTypes.string.isRequired,
        grid: React.PropTypes.object.isRequired,
        points: React.PropTypes.array.isRequired,
        activePoint: React.PropTypes.number.isRequired,
        fillPath: React.PropTypes.bool.isRequired,
        addPoint: React.PropTypes.func.isRequired,
        handleMouseMove: React.PropTypes.func.isRequired,
        setDraggedPoint: React.PropTypes.func.isRequired,
        setDraggedQuadratic: React.PropTypes.func.isRequired,
        setDraggedCubic: React.PropTypes.func.isRequired,
    }

    render() {
        const {
            w,
            h,
            path,
            grid,
            points,
            activePoint,
            fillPath,
            addPoint,
            handleMouseMove,
            setDraggedPoint,
            setDraggedQuadratic,
            setDraggedCubic,
        } = this.props

        let circles = points.map((point, index, _points) => {
            let anchors = [],
                previous = false

            if (index !== 0) {
                previous = _points[index - 1]
            }

            if (point.quadratic && ! point.quadratic.t) {
                anchors.push(
                    <Quadratic
                        key={ `q_${ index }` }
                        index={ index }
                        p1x={ previous.x }
                        p1y={ previous.y }
                        p2x={ point.x }
                        p2y={ point.y }
                        x={ point.quadratic.x }
                        y={ point.quadratic.y }
                        setDraggedQuadratic={ setDraggedQuadratic } />
                )
            } else if (point.cubic && ! point.cubic.s) {
                anchors.push(
                    <Cubic
                        key={ `c_${ index }` }
                        index={ index }
                        p1x={ previous.x }
                        p1y={ previous.y }
                        p2x={ point.x }
                        p2y={ point.y }
                        x1={ point.cubic.x1 }
                        y1={ point.cubic.y1 }
                        x2={ point.cubic.x2 }
                        y2={ point.cubic.y2 }
                        setDraggedCubic={ setDraggedCubic } />
                )
            }

            return (
                <g
                    key={ index }
                    className={ cx("ad-PointGroup", {
                        "ad-PointGroup--first": (index === 0),
                        "is-active": (activePoint === index),
                    }) }>
                    <Point
                        index={ index }
                        x={ point.x }
                        y={ point.y }
                        setDraggedPoint={ setDraggedPoint } />

                    { anchors }
                </g>
            )
        })

        return (
            <svg
                className="ad-SVG"
                width={ w }
                height={ h }
                onClick={ addPoint }
                onMouseMove={ handleMouseMove }>
                <Grid
                    w={ w }
                    h={ h }
                    grid={ grid } />

                <path
                    className={ cx("ad-Path", { "ad-Path--filled": fillPath }) }
                    d={ path } />

                <g className="ad-Points">
                    { circles }
                </g>
            </svg>
        )
    }
}

export default SVG
