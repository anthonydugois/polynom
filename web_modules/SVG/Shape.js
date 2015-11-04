import React from "react"
import cx from "classnames"

import Point from "./Point"

import { getPath } from "../../src/utils/path"

function Shape(props) {
    const {
        active,
        path,
    } = props

    const {
        closed,
        relative,
        filled,
        activePoint,
        points,
    } = path

    const circles = points.map((point, index, _points) => {
        const anchors = []

        /*if (index !== 0) {
            const prev = _points[index - 1]

            if (point.quadratic) {
                anchors.push(
                    <Quadratic
                        key={ `q_${ index }` }
                        index={ index }
                        p1x={ prev.x }
                        p1y={ prev.y }
                        p2x={ point.x }
                        p2y={ point.y }
                        x={ point.quadratic.x }
                        y={ point.quadratic.y }
                        t={ prev.quadratic && point.quadratic.t }
                        drag={ drag } />
                )
            } else if (point.cubic) {
                anchors.push(
                    <Cubic
                        key={ `c_${ index }` }
                        index={ index }
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
                )
            }
        }*/

        return (
            <g
                key={ index }
                className={ cx("ad-PointGroup", {
                    "ad-PointGroup--first": (index === 0),
                    "is-active": (index === activePoint),
                }) }>
                <Point
                    index={ index }
                    x={ point.x }
                    y={ point.y } />
            </g>
        )
    })

    return (
        <g className={ cx("ad-Shape", { "is-active": active }) }>
            <g className="ad-Points">
                { circles }
            </g>

            <path
                className={ cx("ad-Path", { "ad-Path--filled": filled }) }
                d={ getPath(points, closed, relative) } />
        </g>
    )
}

export default Shape
