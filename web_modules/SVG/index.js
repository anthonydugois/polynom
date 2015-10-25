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

        let circles = points.map((p, i, a) => {
            let anchors = []

            if (p.q) {
                anchors.push(
                    <Quadratic
                        index={ i }
                        p1x={ a[i - 1].x }
                        p1y={ a[i - 1].y }
                        p2x={ p.x }
                        p2y={ p.y }
                        x={ p.q.x }
                        y={ p.q.y }
                        setDraggedQuadratic={ setDraggedQuadratic } />
                )
            } else if (p.c) {
                anchors.push(
                    <Cubic
                        index={ i }
                        p1x={ a[i - 1].x }
                        p1y={ a[i - 1].y }
                        p2x={ p.x }
                        p2y={ p.y }
                        x1={ p.c[0].x }
                        y1={ p.c[0].y }
                        x2={ p.c[1].x }
                        y2={ p.c[1].y }
                        setDraggedCubic={ setDraggedCubic } />
                )
            }

            return (
                <g
                    key={ i }
                    className={ cx("ad-PointGroup", {
                        "ad-PointGroup--first": (i === 0),
                        "is-active": (activePoint === i),
                    }) }>
                    <Point
                        index={ i }
                        x={ p.x }
                        y={ p.y }
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
