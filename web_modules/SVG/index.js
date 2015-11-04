import React, { Component } from "react"
import cx from "classnames"

import Grid from "./Grid"
import Shape from "./Shape"
import Cubic from "./Cubic"
import Quadratic from "./Quadratic"

import "./styles"

class SVG extends Component {
    static propTypes = {
        w: React.PropTypes.number.isRequired,
        h: React.PropTypes.number.isRequired,
        grid: React.PropTypes.object.isRequired,
        activePath: React.PropTypes.number.isRequired,
        paths: React.PropTypes.array.isRequired,
        /*addPoint: React.PropTypes.func.isRequired,
        drag: React.PropTypes.func.isRequired,
        handleMouseMove: React.PropTypes.func.isRequired,*/
    }

    render() {
        const {
            w,
            h,
            grid,
            activePath,
            paths,
            /*addPoint,
            drag,
            handleMouseMove,*/
        } = this.props

        const shapes = paths.map((path, index) => {
            return (
                <Shape
                    key={ index }
                    active={ index === activePath }
                    path={ path } />
            )
        })

        /*let circles = points.map((point, index, _points) => {
            let anchors = [],
                previous = false

            if (index !== 0) {
                previous = _points[index - 1]
            }

            if (point.quadratic) {
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
                        t={ previous.quadratic && point.quadratic.t }
                        drag={ drag } />
                )
            } else if (point.cubic) {
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
                        s={ previous.cubic && point.cubic.s }
                        drag={ drag } />
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
                        drag={ drag } />

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
        )*/

        return (
            <svg
                className="ad-SVG"
                width={ w }
                height={ h }>
                <Grid
                    w={ w }
                    h={ h }
                    grid={ grid } />

                <g className="ad-Shapes">
                    { shapes }
                </g>
            </svg>
        )
    }
}

export default SVG
