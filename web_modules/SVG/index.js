import React, { Component } from "react"
import cx from "classnames"

import Grid from "./Grid"
import Shape from "./Shape"

import "./styles"

class SVG extends Component {
    static propTypes = {
        w: React.PropTypes.number.isRequired,
        h: React.PropTypes.number.isRequired,
        grid: React.PropTypes.object.isRequired,
        activePath: React.PropTypes.number.isRequired,
        paths: React.PropTypes.array.isRequired,
        addPoint: React.PropTypes.func.isRequired,
        handleMouseMove: React.PropTypes.func.isRequired,
        setActivePath: React.PropTypes.func.isRequired,
        drag: React.PropTypes.func.isRequired,
    }

    render() {
        const {
            w,
            h,
            grid,
            activePath,
            paths,
            addPoint,
            handleMouseMove,
            ...props,
        } = this.props

        const shapes = paths.map((path, index) => {
            return (
                <Shape
                    key={ index }
                    shape={ index }
                    activePath={ activePath }
                    path={ path }
                    { ...props } />
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

                <g className="ad-Shapes">
                    { shapes }
                </g>
            </svg>
        )
    }
}

export default SVG
