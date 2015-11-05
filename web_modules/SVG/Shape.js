import React from "react"
import cx from "classnames"

import Point from "./Point"
import Quadratic from "./Quadratic"
import Cubic from "./Cubic"

import { getPath } from "../../src/utils/path"

function Shape(props) {
    const {
        index,
        activePath,
        path,
        drag,
    } = props

    const {
        closed,
        relative,
        filled,
        activePoint,
        points,
    } = path

    const circles = points.map((point, i, _points) => {
        const anchors = []
        const prev = i !== 0 ? _points[i - 1] : false

        return (
            <g
                key={ i }
                className={ cx("ad-PointGroup", {
                    "ad-PointGroup--first": i === 0,
                    "is-active": i === activePoint,
                }) }>
                <Point
                    activePath={ index }
                    activePoint={ i }
                    x={ point.x }
                    y={ point.y }
                    drag={ drag } />

                { point.quadratic && (
                    <Quadratic
                        activePath={ index }
                        activePoint={ i }
                        p1x={ prev.x }
                        p1y={ prev.y }
                        p2x={ point.x }
                        p2y={ point.y }
                        x={ point.quadratic.x }
                        y={ point.quadratic.y }
                        t={ prev.quadratic && point.quadratic.t }
                        drag={ drag } />
                ) }

                { point.cubic && (
                    <Cubic
                        activePath={ index }
                        activePoint={ i }
                        p1x={ prev.x }
                        p1y={ prev.y }
                        p2x={ point.x }
                        p2y={ point.y }
                        x1={ point.cubic.x1 }
                        y1={ point.cubic.y1 }
                        x2={ point.cubic.x2 }
                        y2={ point.cubic.y2 }
                        s={ prev.cubic && point.cubic.s }
                        drag={ drag } />
                ) }
            </g>
        )
    })

    return (
        <g className={ cx("ad-Shape", { "is-active": index === activePath }) }>
            <path
                className={ cx("ad-Path", { "ad-Path--filled": filled }) }
                d={ getPath(points, closed, relative) } />

            <g className="ad-Points">
                { circles }
            </g>
        </g>
    )
}

export default Shape
