import React, { Component } from "react"
import ReactDOM from "react-dom"

import SVG from "SVG"
import Sidebar from "Sidebar"
import Foot from "App/Foot"

import { positive } from "../../src/utils/maths"
import { M, L, Q, T, C, S, A, getPoints } from "../../src/utils/points"
import { getPath, getClosePath } from "../../src/utils/path"

import "./styles"

class Builder extends Component {
    state = {
        ctrl: false,
        drag: false,
        w: 1000,
        h: 800,
        grid: {
            show: true,
            snap: true,
            size: 50,
        },
        activePath: 0,
        paths: [
            {
                closed: false,
                relative: false,
                filled: false,
                activePoint: 0,
                points: [{ x: 200, y: 200 }, { x: 300, y: 200 }],
            },
            {
                closed: false,
                relative: false,
                filled: false,
                activePoint: 0,
                points: [{ x: 500, y: 400 }],
            },
        ],
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
        if (e.ctrlKey) {
            this.setState({ ctrl: true })
        }
    }

    handleKeyUp = (e) => {
        if ( ! e.ctrlKey) {
            this.setState({ ctrl: false })
        }
    }

    setWidth = (e) => {
        this.setState({ w: positive(e.target.value, 1) })
    }

    setHeight = (e) => {
        this.setState({ h: positive(e.target.value, 1) })
    }

    setRelative = (e, path) => {
        const { paths } = this.state
        paths[path].relative = e.target.checked

        this.setState({ paths })
    }

    setClosed = (e, path) => {
        const { paths } = this.state
        paths[path].closed = e.target.checked

        this.setState({ paths })
    }

    setFilled = (e, path) => {
        const { paths } = this.state
        paths[path].filled = e.target.checked

        this.setState({ paths })
    }

    setGridSize = (e) => {
        const { grid } = this.state

        grid.size = positive(e.target.value, 1, Math.min(this.state.w, this.state.h))

        this.setState({ grid })
    }

    setGridSnap = (e) => {
        const { grid } = this.state

        grid.snap = e.target.checked

        this.setState({ grid })
    }

    setGridShow = (e) => {
        const { grid } = this.state

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

    setActivePath = (e, activePath) => {
        e.preventDefault()

        this.setState({ activePath })
    }

    /*setPointType = (e) => {
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
    }*/

    setPointPosition = (coord, e) => {
        const {
            w,
            h,
            activePath,
            paths,
        } = this.state,
        path = paths[activePath],
        v = e.target.value

        let point = path.points[path.activePoint]

        point[coord] = coord === "x" ?
            positive(v, false, w) :
            positive(v, false, h)

        this.setPointCoords(point)
    }

    setPointCoords = (point) => {
        const { activePath, paths } = this.state,
            { activePoint } = paths[activePath]

        paths[activePath].points[activePoint].x = point.x
        paths[activePath].points[activePoint].y = point.y

        this.setState({ paths })
    }

    /*setQuadraticPosition = (coord, e) => {
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
    }*/

    drag = (e, activePath, activePoint, object = "point") => {
        e.preventDefault()

        const { paths } = this.state

        paths[activePath].activePoint = activePoint

        if ( ! this.state.ctrl) {
            this.setState({
                paths,
                activePath,
                drag: { object },
            })
        }
    }

    cancelDragging = (e) => {
        this.setState({ drag: false })
    }

    addPoint = (e) => {
        if (this.state.ctrl) {
            const { activePath, paths } = this.state,
                { activePoint, points } = paths[activePath],
                coords = this.getMouseCoords(e)

            // paths[activePath].points = this.resetNextCurve(points, activePoint)
            paths[activePath].points = [
                ...points.slice(0, activePoint + 1),
                coords,
                ...(activePoint === points.length - 1 ? [] : points.slice(activePoint + 1, points.length)),
            ]

            paths[activePath].activePoint++

            this.setState({ paths })
        }
    }

    /*removeActivePoint = (e) => {
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
                activePoint: activePoint - 1,
                path: getPath(points, closePath, relativePoints),
            })
        }
    }*/

    handleMouseMove = (e) => {
        e.preventDefault()

        if ( ! this.state.ctrl) {
            const { object } = this.state.drag

            switch (object) {
                case "point":
                    this.setPointCoords(this.getMouseCoords(e))
                break
            }

                /*case "quadratic":
                    this.setQuadraticCoords(this.getMouseCoords(e))
                break

                case "cubic":
                    this.setCubicCoords(this.getMouseCoords(e), n)
                break*/
        }
    }

    /*reset = (e) => {
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
                    <Sidebar
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
    }*/

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
                            addPoint={ this.addPoint }
                            handleMouseMove={ this.handleMouseMove }
                            drag={ this.drag } />
                    </div>

                    <Foot />
                </div>

                <div className="ad-Builder-controls">
                    <Sidebar
                        { ...this.state }
                        setWidth={ this.setWidth }
                        setHeight={ this.setHeight }
                        setGridSize={ this.setGridSize }
                        setGridSnap={ this.setGridSnap }
                        setGridShow={ this.setGridShow }
                        setActivePath={ this.setActivePath }
                        setRelative={ this.setRelative }
                        setClosed={ this.setClosed }
                        setFilled={ this.setFilled } />
                </div>
            </div>
        )
    }
}

export default Builder
