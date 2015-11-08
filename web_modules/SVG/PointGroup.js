import React from "react"
import cx from "classnames"

import Point from "./Point"
import Quadratic from "./Quadratic"
import Cubic from "./Cubic"

function PointGroup(props) {
    const {
        pointGroup,
        shape,
        activePoint,
        point,
        prev,
        drag,
    } = props

    return (
        <g
            className={ cx("ad-PointGroup", {
                "ad-PointGroup--first": pointGroup === 0,
                "is-active": pointGroup === activePoint,
            }) }>
            <Point
                activePath={ shape }
                activePoint={ pointGroup }
                x={ point.x }
                y={ point.y }
                drag={ drag } />

            { point.quadratic && (
                <Quadratic
                    activePath={ shape }
                    activePoint={ pointGroup }
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
                    activePath={ shape }
                    activePoint={ pointGroup }
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
}

export default PointGroup
