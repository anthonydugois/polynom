import React, { Component } from "react"
import ReactDOM from "react-dom"

import SVG from "SVG"
import Controls from "Controls"
import Foot from "App/Foot"

import { positive, rangeGrid } from "../../src/utils/maths"
import { M, L, Q, T, C, S, A, getPoints } from "../../src/utils/points"
import { getPath, getClosePath } from "../../src/utils/path"

import "./styles"

class Builder extends Component {
    static propTypes = {
        initialPoints: React.PropTypes.array.isRequired,
        initialClosePath: React.PropTypes.bool.isRequired,
        initialRelativePoints: React.PropTypes.bool.isRequired,
    }

    state = {
        w: 1000,
        h: 800,
        ctrl: false,
        activePoint: 0,
        isDragging: false,
        fillPath: false,
        grid: {
            show: true,
            snap: true,
            size: 50,
        },
        points: this.props.initialPoints,
        closePath: this.props.initialClosePath,
        relativePoints: this.props.initialRelativePoints,
        path: getPath(this.props.initialPoints, this.props.initialClosePath, this.props.initialRelativePoints),
    }

    componentWillMount() {
        document.addEventListener("keydown", this.handleKeyDown, false)
        document.addEventListener("keyup", this.handleKeyUp, false)
    }

    componentWillUnmount() {
        document.removeEventListener("keydown")
        document.removeEventListener("keyup")
    }

    handleKeyDown = (e) => {
        if (e.ctrlKey || e.metaKey) {
            this.setState({ ctrl: true })
        }
    }

    handleKeyUp = (e) => {
        if ( ! e.ctrlKey && ! e.metaKey) {
            this.setState({ ctrl: false })
        }
    }

    /**
     * SVG document parameters
     */
    setWidth = (e) => {
        let v = positive(e.target.value),
            min = 1

        if (v < min) {
            v = min
        }

        this.setState({ w: v })
    }

    setHeight = (e) => {
        let v = positive(e.target.value),
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
        const { points, relativePoints } = this.state,
            closePath = e.target.checked

        this.setState({
            closePath,
            path: getPath(points, closePath, relativePoints),
        })
    }

    setRelativePoints = (e) => {
        const { points, closePath } = this.state,
            relativePoints = e.target.checked

        this.setState({
            relativePoints,
            path: getPath(points, closePath, relativePoints),
        })
    }

    setFillPath = (e) => {
        this.setState({ fillPath: e.target.checked })
    }

    /**
     * Grid parameters
     */
    setGridSize = (e) => {
        let grid = this.state.grid

        grid.size = rangeGrid(positive(e.target.value), 1, Math.min(this.state.w, this.state.h))

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
        const { left, top } = ReactDOM.findDOMNode(this.refs.svg).getBoundingClientRect(),
            { size, snap } = this.state.grid

        let x = Math.round(e.pageX - left),
            y = Math.round(e.pageY - top)

        if (snap) {
            x = size * Math.round(x / size)
            y = size * Math.round(y / size)
        }

        return { x, y }
    }

    resetNextCurve = (points, active) => {
        if (active !== points.length - 1) {
            if (points[active + 1].quadratic) {
                points[active + 1].quadratic.t = false
            }

            if (points[active + 1].cubic) {
                points[active + 1].cubic.s = false
            }
        }

        return points
    }

    /**
     * Default point values
     */
    setPointType = (e) => {
        let {
            points,
            activePoint,
            closePath,
            relativePoints,
        } = this.state

        // not the first point
        if (activePoint !== 0) {
            let v = e.target.value

            points = this.resetNextCurve(points, activePoint)

            let p = points[activePoint],
                _p = points[activePoint - 1]

            switch (v) {
                case "l":
                    points[activePoint] = L(p.x, p.y)
                break

                case "q":
                    points[activePoint] = Q(p.x, p.y, (p.x + _p.x) / 2, (p.y + _p.y) / 2)
                break

                case "c":
                    points[activePoint] = C(p.x, p.y, (p.x + _p.x - 50) / 2, (p.y + _p.y) / 2, (p.x + _p.x + 50) / 2, (p.y + _p.y) / 2)
                break

                case "a":
                    points[activePoint] = A(p.x, p.y, 50, 50, 0, 1, 1)
                break
            }

            this.setState({
                points,
                path: getPath(points, closePath, relativePoints),
            })
        }
    }

    setPointPosition = (coord, e) => {
        let coords = this.state.points[this.state.activePoint],
            v = positive(e.target.value)

        if (coord === "x" && v > this.state.w) {
            v = this.state.w
        } else if (coord === "y" && v > this.state.h) {
            v = this.state.h
        }

        coords[coord] = v

        this.setPointCoords(coords)
    }

    setPointCoords = (coords) => {
        const {
            points,
            activePoint,
            closePath,
            relativePoints,
        } = this.state

        points[activePoint].x = coords.x
        points[activePoint].y = coords.y

        this.setState({
            points,
            path: getPath(points, closePath, relativePoints),
        })
    }

    setQuadraticPosition = (coord, e) => {
        let coords = this.state.points[this.state.activePoint].quadratic,
            v = positive(e.target.value)

        if (coord === "x" && v > this.state.w) {
            v = this.state.w
        } else if (coord === "y" && v > this.state.h) {
            v = this.state.h
        }

        coords[coord] = v

        this.setQuadraticCoords(coords)
    }

    setQuadraticCoords = (coords) => {
        const {
            points,
            activePoint,
            closePath,
            relativePoints,
        } = this.state

        points[activePoint].quadratic.x = coords.x
        points[activePoint].quadratic.y = coords.y

        this.setState({
            points,
            path: getPath(points, closePath, relativePoints),
        })
    }

    setQuadraticT = (e) => {
        const {
            points,
            activePoint,
            closePath,
            relativePoints,
        } = this.state

        points[activePoint].quadratic.t = e.target.checked

        this.setState({
            points,
            path: getPath(points, closePath, relativePoints),
        })
    }

    setCubicPosition = (coord, e) => {
        let coords = this.state.points[this.state.activePoint].cubic,
            v = positive(e.target.value),
            n = 0

        if (coord === "x1") {
            this.setCubicCoords({
                x: v,
                y: coords.y1,
            }, 1)
        }

        if (coord === "y1") {
            this.setCubicCoords({
                x: coords.x1,
                y: v,
            }, 1)
        }

        if (coord === "x2") {
            this.setCubicCoords({
                x: v,
                y: coords.y2,
            }, 2)
        }

        if (coord === "y2") {
            this.setCubicCoords({
                x: coords.x2,
                y: v,
            }, 2)
        }
    }

    setCubicCoords = (coords, n) => {
        const {
            points,
            activePoint,
            closePath,
            relativePoints,
        } = this.state

        if (n === 1) {
            points[activePoint].cubic.x1 = coords.x
            points[activePoint].cubic.y1 = coords.y
        }

        if (n === 2) {
            points[activePoint].cubic.x2 = coords.x
            points[activePoint].cubic.y2 = coords.y
        }

        this.setState({
            points,
            path: getPath(points, closePath, relativePoints),
        })
    }

    setCubicS = (e) => {
        const {
            points,
            activePoint,
            closePath,
            relativePoints,
        } = this.state

        points[activePoint].cubic.s = e.target.checked

        this.setState({
            points,
            path: getPath(points, closePath, relativePoints),
        })
    }

    setArcParam = (param, e) => {
        const {
            points,
            activePoint,
            closePath,
            relativePoints,
        } = this.state

        let v

        if (["laf", "sf"].indexOf(param) > -1) {
            v = e.target.checked ? 1 : 0
        } else {
            v = positive(e.target.value)
        }

        points[activePoint].arc[param] = v

        this.setState({
            points,
            path: getPath(points, closePath, relativePoints),
        })
    }

    drag = (e, index, object = "point", n = false) => {
        e.preventDefault()

        if ( ! this.state.ctrl) {
            this.setState({
                activePoint: index,
                isDragging: { object, n },
            })
        }
    }

    cancelDragging = (e) => {
        this.setState({ isDragging: false })
    }

    addPoint = (e) => {
        if (this.state.ctrl) {
            let {
                points,
                activePoint,
                closePath,
                relativePoints,
            } = this.state,
            coords = this.getMouseCoords(e)

            points = this.resetNextCurve(points, activePoint)
            points = [
                ...points.slice(0, activePoint + 1),
                coords,
                ...(activePoint === points.length - 1 ? [] : points.slice(activePoint + 1, points.length)),
            ]

            this.setState({
                points,
                activePoint: activePoint + 1,
                path: getPath(points, closePath, relativePoints),
            })
        }
    }

    removeActivePoint = (e) => {
        let {
            points,
            activePoint,
            closePath,
            relativePoints,
        } = this.state

        if (points.length > 1 && activePoint !== 0) {
            points = this.resetNextCurve(points, activePoint)
            points.splice(activePoint, 1)

            this.setState({
                points,
                activePoint: points.length - 1,
                path: getPath(points, closePath, relativePoints),
            })
        }
    }

    handleMouseMove = (e) => {
        e.preventDefault()

        if ( ! this.state.ctrl) {
            let { object, n } = this.state.isDragging

            switch (object) {
                case "point":
                    this.setPointCoords(this.getMouseCoords(e))
                break

                case "quadratic":
                    this.setQuadraticCoords(this.getMouseCoords(e))
                break

                case "cubic":
                    this.setCubicCoords(this.getMouseCoords(e), n)
                break
            }
        }
    }

    reset = (e) => {
        const { w, h } = this.state,
            points = [{ x: w / 2, y: h / 2 }],
            activePoint = 0,
            closePath = false,
            relativePoints = false,
            path = getPath(points, closePath, relativePoints)

        this.setState({
            points,
            path,
            closePath,
            relativePoints,
            activePoint,
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
                            { ...this.state }
                            drag={ this.drag }
                            addPoint={ this.addPoint }
                            handleMouseMove={ this.handleMouseMove } />
                    </div>

                    <Foot />
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
                        setFillPath={ this.setFillPath }
                        setRelativePoints={ this.setRelativePoints } />
                </div>
            </div>
        )
    }
}

export default Builder
