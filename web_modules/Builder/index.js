import React, { Component } from "react"
import ReactDOM from "react-dom"

import SVG from "SVG"
import Controls from "Controls"
import Result from "Controls/Result"

import "./styles"

class Builder extends Component {
    state = {
        w: 800,
        h: 600,
        grid: {
            show: true,
            snap: true,
            size: 50,
        },
        ctrl: false,
        points: [
            {
                x: 100,
                y: 300,
            },
        ],
        activePoint: 0,
        draggedPoint: false,
        draggedQuadratic: false,
        draggedCubic: false,
        closePath: false,
        fillPath: false,
    }

    componentWillMount() {
        document.addEventListener("keydown", this.handleKeyDown, false)
        document.addEventListener("keyup", this.handleKeyUp, false)
    }

    componentWillUnmount() {
        document.removeEventListener("keydown")
        document.removeEventListener("keyup")
    }

    positiveNumber(n) {
        n = parseInt(n)

        if (isNaN(n) || n < 0) {
            n = 0
        }

        return n
    }

    /**
     * SVG document parameters
     */
    setWidth = (e) => {
        let v = this.positiveNumber(e.target.value),
            min = 1

        if (v < min) {
            v = min
        }

        this.setState({ w: v })
    }

    setHeight = (e) => {
        let v = this.positiveNumber(e.target.value),
            min = 1

        if (v < min) {
            v = min
        }

        this.setState({ h: v })
    }

    /**
     * Path parameters
     */
    setClosePath = (e) => {
        this.setState({ closePath: e.target.checked })
    }

    setFillPath = (e) => {
        this.setState({ fillPath: e.target.checked })
    }

    /**
     * Grid parameters
     */
    setGridSize = (e) => {
        let grid = this.state.grid,
            v = this.positiveNumber(e.target.value),
            min = 1,
            max = Math.min(this.state.w, this.state.h)

        if (v < min) {
            v = min
        }

        if (v >= max) {
            v = max / 2
        }

        grid.size = v

        this.setState({ grid })
    }

    setGridSnap = (e) => {
        let grid = this.state.grid

        grid.snap = e.target.checked

        this.setState({ grid })
    }

    setGridShow = (e) => {
        let grid = this.state.grid

        grid.show = e.target.checked

        this.setState({ grid })
    }

    getMouseCoords = (e) => {
        const rect = ReactDOM.findDOMNode(this.refs.svg).getBoundingClientRect()

        let x = Math.round(e.pageX - rect.left),
            y = Math.round(e.pageY - rect.top)

        if (this.state.grid.snap) {
            x = this.state.grid.size * Math.round(x / this.state.grid.size)
            y = this.state.grid.size * Math.round(y / this.state.grid.size)
        }

        return { x, y }
    }

    /**
     * Default point values
     */
    setPointType = (e) => {
        const points = this.state.points,
            active = this.state.activePoint

        // not the first point
        if (active !== 0) {
            let v = e.target.value

            switch (v) {
                case "l":
                    points[active] = {
                        x: points[active].x,
                        y: points[active].y,
                    }
                break

                case "q":
                    points[active] = {
                        x: points[active].x,
                        y: points[active].y,
                        quadratic: {
                            t: false,
                            x: (points[active].x + points[active - 1].x) / 2,
                            y: (points[active].y + points[active - 1].y) / 2,
                        },
                    }
                break

                case "c":
                    points[active] = {
                        x: points[active].x,
                        y: points[active].y,
                        cubic: {
                            s: false,
                            x1: (points[active].x + points[active - 1].x - 50) / 2,
                            y1: (points[active].y + points[active - 1].y) / 2,
                            x2: (points[active].x + points[active - 1].x + 50) / 2,
                            y2: (points[active].y + points[active - 1].y) / 2,
                        },
                    }
                break

                case "a":
                    points[active] = {
                        x: points[active].x,
                        y: points[active].y,
                        arc: {
                            rx: 50,
                            ry: 50,
                            rot: 0,
                            laf: 1,
                            sf: 1,
                        },
                    }
                break

                default:
                    points[active] = {
                        x: 0,
                        y: 0,
                    }
                break
            }

            this.setState({ points })
        }
    }

    setPointPosition = (coord, e) => {
        let coords = this.state.points[this.state.activePoint],
            v = this.positiveNumber(e.target.value)

        if (coord === "x" && v > this.state.w) {
            v = this.state.w
        } else if (coord === "y" && v > this.state.h) {
            v = this.state.h
        }

        coords[coord] = v

        this.setPointCoords(coords)
    }

    setPointCoords = (coords) => {
        const points = this.state.points,
            active = this.state.activePoint

        points[active].x = coords.x
        points[active].y = coords.y

        this.setState({ points })
    }

    setQuadraticPosition = (coord, e) => {
        let coords = this.state.points[this.state.activePoint].quadratic,
            v = this.positiveNumber(e.target.value)

        if (coord === "x" && v > this.state.w) {
            v = this.state.w
        } else if (coord === "y" && v > this.state.h) {
            v = this.state.h
        }

        coords[coord] = v

        this.setQuadraticCoords(coords)
    }

    setQuadraticCoords = (coords) => {
        const points = this.state.points,
            active = this.state.activePoint

        points[active].quadratic.x = coords.x
        points[active].quadratic.y = coords.y

        this.setState({ points })
    }

    setQuadraticT = (e) => {
        const points = this.state.points,
            active = this.state.activePoint

        points[active].quadratic.t = e.target.checked

        this.setState({ points })
    }

    setCubicPosition = (coord, e) => {
        let coords = this.state.points[this.state.activePoint].cubic,
            v = this.positiveNumber(e.target.value)

        if (coord === "x" && v > this.state.w) {
            v = this.state.w
        } else if (coord === "y" && v > this.state.h) {
            v = this.state.h
        }

        coords[coord] = v

        this.setCubicCoords(coords)
    }

    setCubicCoords = (coords, anchor) => {
        const points = this.state.points,
            active = this.state.activePoint

        points[active].cubic.x1 = coords.x1
        points[active].cubic.y1 = coords.y1
        points[active].cubic.x2 = coords.x2
        points[active].cubic.y2 = coords.y2

        this.setState({ points })
    }

    setCubicS = (e) => {
        const points = this.state.points,
            active = this.state.activePoint

        points[active].cubic.s = e.target.checked

        this.setState({ points })
    }

    setArcParam = (param, e) => {
        const points = this.state.points,
            active = this.state.activePoint

        let v

        if (["laf", "sf"].indexOf(param) > -1) {
            v = e.target.checked ? 1 : 0
        } else {
            v = this.positiveNumber(e.target.value)
        }

        points[active].arc[param] = v

        this.setState({ points })
    }

    setDraggedPoint = (e, index) => {
        e.preventDefault()

        if ( ! this.state.ctrl) {
            this.setState({
                activePoint: index,
                draggedPoint: true,
            })
        }
    }

    setDraggedQuadratic = (e, index) => {
        e.preventDefault()

        if ( ! this.state.ctrl) {
            this.setState({
                activePoint: index,
                draggedQuadratic: true,
            })
        }
    }

    setDraggedCubic = (e, index, anchor) => {
        e.preventDefault()

        if ( ! this.state.ctrl) {
            this.setState({
                activePoint: index,
                draggedCubic: anchor,
            })
        }
    }

    cancelDragging = (e) => {
        this.setState({
            draggedPoint: false,
            draggedQuadratic: false,
            draggedCubic: false,
        })
    }

    addPoint = (e) => {
        if (this.state.ctrl) {
            let coords = this.getMouseCoords(e),
                points = this.state.points

            points.push(coords)

            this.setState({
                points,
                activePoint: points.length - 1,
            })
        }
    }

    removeActivePoint = (e) => {
        let points = this.state.points,
            active = this.state.activePoint

        if (points.length > 1 && active !== 0) {
            points.splice(active, 1)

            this.setState({
                points,
                activePoint: points.length - 1,
            })
        }
    }

    handleMouseMove = (e) => {
        e.preventDefault()

        if ( ! this.state.ctrl) {
            if (this.state.draggedPoint) {
                this.setPointCoords(this.getMouseCoords(e))
            } else if (this.state.draggedQuadratic) {
                this.setQuadraticCoords(this.getMouseCoords(e))
            } else if (this.state.draggedCubic !== false) {
                this.setCubicCoords(this.getMouseCoords(e), this.state.draggedCubic)
            }
        }
    }

    handleKeyDown = (e) => {
        if (e.ctrlKey) {
            this.setState({ ctrl: true })
        }
    }

    handleKeyUp = (e) => {
        if ( ! e.ctrlKey) {
            this.setState({ ctrl: false })
        }
    }

    getPath() {
        let { points, closePath } = this.state,
            d = ""

        points.forEach((point, index) => {
            if (index === 0) {
                // first point
                d += "M "
            } else if (point.quadratic) {
                // quadratic
                d += point.quadratic.t ?
                    "T " :
                    `Q ${ point.quadratic.x } ${ point.quadratic.y } `
            } else if (point.cubic) {
                // cubic
                d += point.cubic.s ?
                    `S ${ point.cubic.x2 } ${ point.cubic.y2 } ` :
                    `C ${ point.cubic.x1 } ${ point.cubic.y1 } ${ point.cubic.x2 } ${ point.cubic.y2 } `
            } else if (point.a) {
                // arc
                d += `A ${ point.a.rx } ${ point.a.ry } ${ point.a.rot } ${ point.a.laf } ${ point.a.sf } `
            } else {
                // line
                d += "L "
            }

            d += `${ point.x } ${ point.y } `
        })

        if (closePath) {
            d += "Z"
        }

        return d
    }

    reset = (e) => {
        let w = this.state.w,
            h = this.state.h

        this.setState({
            activePoint: 0,
            points: [
                {
                    x: w / 2,
                    y: h / 2,
                },
            ],
        })
    }

    render() {
        return (
            <div
                className="ad-Builder"
                onMouseUp={ this.cancelDragging }>
                <div className="ad-Builder-main">
                    <div className="ad-Builder-svg">
                        <SVG
                            ref="svg"
                            path={ this.getPath() }
                            { ...this.state }
                            addPoint={ this.addPoint }
                            setDraggedPoint={ this.setDraggedPoint }
                            setDraggedQuadratic={ this.setDraggedQuadratic }
                            setDraggedCubic={ this.setDraggedCubic }
                            handleMouseMove={ this.handleMouseMove } />
                    </div>
                </div>

                <div className="ad-Builder-controls">
                    <Controls
                        { ...this.state }
                        reset={ this.reset }
                        removeActivePoint={ this.removeActivePoint }
                        setPointPosition={ this.setPointPosition }
                        setQuadraticPosition={ this.setQuadraticPosition }
                        setQuadraticT={ this.setQuadraticT }
                        setCubicPosition={ this.setCubicPosition }
                        setCubicS={ this.setCubicS }
                        setArcParam={ this.setArcParam }
                        setPointType={ this.setPointType }
                        setWidth={ this.setWidth }
                        setHeight={ this.setHeight }
                        setGridSize={ this.setGridSize }
                        setGridSnap={ this.setGridSnap }
                        setGridShow={ this.setGridShow }
                        setClosePath={ this.setClosePath }
                        setFillPath={ this.setFillPath } />
                </div>
            </div>
        )
    }
}

export default Builder
