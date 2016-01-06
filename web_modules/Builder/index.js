import React, { Component } from "react"
import ReactDOM from "react-dom"

import SVG from "SVG"
import Sidebar from "Sidebar"

import { keyCodes, isCtrlOrMetaKey } from "../../src/utils/keybinding"
import { positive } from "../../src/utils/maths"
import { M, L, Q, C, A, getPathFromString } from "../../src/utils/points"

import "./styles"

class Builder extends Component {
  state = {
    ctrl: false,
    dragging: false,
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
        relative: true,
        filled: false,
        activePoint: 1,
        points: [
          { x: 350, y: 300 },
          { type: "a", x: 150, y: 300, arc: { rx: 50, ry: 50, rot: 0, laf: 1, sf: 0 }},
          { type: "c", x: 350, y: 400, cubic: { s: false, x1: 150, y1: 400, x2: 350, y2: 300 }},
          { type: "a", x: 150, y: 400, arc: { rx: 50, ry: 50, rot: 0, laf: 1, sf: 1 }},
        ],
      },
      {
        closed: false,
        relative: false,
        filled: false,
        activePoint: 1,
        points: [
          { x: 400, y: 250 },
          { type: "l", x: 400, y: 400 },
          { type: "l", x: 500, y: 500 },
          { type: "l", x: 600, y: 400 },
          { type: "l", x: 600, y: 250 },
        ],
      },
      {
        closed: false,
        relative: false,
        filled: false,
        activePoint: 1,
        points: [
          { x: 850, y: 300 },
          { type: "a", x: 650, y: 300, arc: { rx: 50, ry: 50, rot: 0, laf: 1, sf: 0 }},
          { type: "l", x: 650, y: 400 },
          { type: "a", x: 850, y: 400, arc: { rx: 50, ry: 50, rot: 0, laf: 1, sf: 0 }},
          { type: "l", x: 850, y: 350 },
          { type: "l", x: 750, y: 350 },
        ],
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
    if (isCtrlOrMetaKey(e)) {
      this.setState({ ctrl: true })
    }
  }

  handleKeyUp = (e) => {
    if ( ! isCtrlOrMetaKey(e)) {
      this.setState({ ctrl: false })
    }

    this.handleShortcuts(e)
  }

  handleShortcuts = (e) => {
    if (isCtrlOrMetaKey(e)) {
      const {
        activePath,
        paths,
      } = this.state

      let { activePoint, points } = paths[activePath]

      switch (e.keyCode || e.which) {
        case keyCodes["p"]:
          this.addPath(e)
          break

        case keyCodes["d"]:
          this.removePath(e, activePath)
          break

        case keyCodes["r"]:
          this.removePoint(e, activePath, paths[activePath].activePoint)
          break

        case keyCodes["q"]:
          if (activePoint < points.length - 1) {
            paths[activePath].activePoint++
          } else {
            paths[activePath].activePoint = 0
          }

          this.setState({ paths })
          break
      }
    }
  }

  importSVG = (e) => {
    let file = e.target.files[0]
    const reader = new FileReader()

    reader.onload = (f) => {
      const svg = f.target.result,
        w = parseInt(svg.match(/width="(.+)"/)[1]),
        h = parseInt(svg.match(/height="(.+)"/)[1]),
        d = svg.match(/[^a-zA-Z0-9]+d=("|')(.+)("|')/g).map((_d) => _d.replace(/(d|=|"|')/g, "").trim()),
        paths = d.map((path) => getPathFromString(path))

      this.setState({ w, h, paths })
    }

    reader.readAsBinaryString(file)
  }

  setWidth = (e) => {
    this.setState({ w: positive(e.target.value, 1) })
  }

  setHeight = (e) => {
    this.setState({ h: positive(e.target.value, 1) })
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

  setActivePath = (e, activePath) => {
    e.preventDefault()

    this.setState({ activePath })
  }

  setPath = (index, path) => {
    const { paths } = this.state
    const { closed, relative, points } = getPathFromString(path)

    if (points.length > 0) {
      paths[index].closed = closed
      paths[index].relative = relative
      paths[index].points = points

      this.setState({ paths })
    }
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

  addPath = (e) => {
    e.preventDefault()

    const { w, h, paths } = this.state

    paths.push({
      closed: false,
      relative: false,
      filled: false,
      activePoint: 0,
      points: [{ x: w / 2, y: h / 2 }],
    })

    this.setState({
      activePath: paths.length - 1,
      paths,
    })
  }

  removePath = (e, path) => {
    e.preventDefault()
    e.stopPropagation()

    let { activePath, paths } = this.state

    if (paths.length > 1) {
      if (path <= activePath && activePath > 0) {
        activePath--
      }

      paths.splice(path, 1)

      this.setState({ activePath, paths })
    }
  }

  addPoint = (e) => {
    if (this.state.ctrl) {
      const coords = this.getMouseCoords(e)
      const { activePath, paths } = this.state
      let { activePoint, points } = paths[activePath]

      points = this.resetNextCurve(activePoint, points)
      points = [
        ...points.slice(0, activePoint + 1),
        L(coords.x, coords.y),
        ...(activePoint === points.length - 1 ? [] : points.slice(activePoint + 1, points.length)),
      ]

      paths[activePath].points = points
      paths[activePath].activePoint++

      this.setState({ paths })
    }
  }

  removePoint = (e, path, point) => {
    const { paths } = this.state
    let { points } = paths[path]

    if (points.length > 1 && point !== 0) {
      points = this.resetNextCurve(point, points)
      points.splice(point, 1)

      paths[path].points = points
      paths[path].activePoint--

      this.setState({ paths })
    }
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

  resetNextCurve = (activePoint, points) => {
    if (activePoint !== points.length - 1) {
      if (points[activePoint + 1].quadratic) {
        points[activePoint + 1].quadratic.t = false
      }

      if (points[activePoint + 1].cubic) {
        points[activePoint + 1].cubic.s = false
      }
    }

    return points
  }

  setPointType = (e) => {
    const { activePath, paths } = this.state
    let { activePoint, points } = paths[activePath]

    if (activePoint !== 0) {
      points = this.resetNextCurve(activePoint, points)

      const p = points[activePoint], _p = points[activePoint - 1]

      switch (e.target.value) {
        case "m":
          points[activePoint] = M(p.x, p.y)
          break

        case "l":
          points[activePoint] = L(p.x, p.y)
          break

        case "q":
          points[activePoint] = Q((p.x + _p.x) / 2, (p.y + _p.y) / 2, p.x, p.y)
          break

        case "c":
          points[activePoint] = C((p.x + _p.x - 50) / 2, (p.y + _p.y) / 2, (p.x + _p.x + 50) / 2, (p.y + _p.y) / 2, p.x, p.y)
          break

        case "a":
          points[activePoint] = A(50, 50, 0, 1, 1, p.x, p.y)
          break
      }

      paths[activePath].points = points

      this.setState({ paths })
    }
  }

  setPointPosition = (e, coord) => {
    const { w, h, activePath, paths } = this.state
    let { activePoint, points } = paths[activePath],
      point = points[activePoint]

    point[coord] = positive(e.target.value, false, coord === "x" ? w : h)

    this.setPointCoords(point)
  }

  setPointCoords = (coords) => {
    const { activePath, paths } = this.state
    let { activePoint, points } = paths[activePath]

    points[activePoint].x = coords.x
    points[activePoint].y = coords.y
    paths[activePath].points = points

    this.setState({ paths })
  }

  setQuadraticPosition = (e, coord) => {
    const { w, h, activePath, paths } = this.state
    let { activePoint, points } = paths[activePath],
      anchor = points[activePoint].quadratic

    anchor[coord] = positive(e.target.value, false, coord === "x" ? w : h)

    this.setQuadraticCoords(anchor)
  }

  setQuadraticCoords = (coords) => {
    const { activePath, paths } = this.state
    let { activePoint, points } = paths[activePath]

    points[activePoint].quadratic.x = coords.x
    points[activePoint].quadratic.y = coords.y
    paths[activePath].points = points

    this.setState({ paths })
  }

  setQuadraticT = (e) => {
    const { activePath, paths } = this.state
    let { activePoint, points } = paths[activePath]

    points[activePoint].quadratic.t = e.target.checked
    paths[activePath].points = points

    this.setState({ paths })
  }

  setCubicPosition = (e, coord) => {
    const { activePath, paths } = this.state
    let { activePoint, points } = paths[activePath],
      { x1, y1, x2, y2 } = points[activePoint].cubic

    switch (coord) {
      case "x1":
        this.setCubicCoords({ x: v, y: y1 }, 1)
        break

      case "y1":
        this.setCubicCoords({ x: x1, y: v }, 1)
        break

      case "x2":
        this.setCubicCoords({ x: v, y: y2 }, 2)
        break

      case "y2":
        this.setCubicCoords({ x: x2, y: v }, 2)
        break
    }
  }

  setCubicCoords = (coords, n) => {
    const { activePath, paths } = this.state
    let { activePoint, points } = paths[activePath]

    if (n === 1) {
      points[activePoint].cubic.x1 = coords.x
      points[activePoint].cubic.y1 = coords.y
    }

    if (n === 2) {
      points[activePoint].cubic.x2 = coords.x
      points[activePoint].cubic.y2 = coords.y
    }

    paths[activePath].points = points

    this.setState({ paths })
  }

  setCubicS = (e) => {
    const { activePath, paths } = this.state
    let { activePoint, points } = paths[activePath]

    points[activePoint].cubic.s = e.target.checked

    paths[activePath].points = points

    this.setState({ paths })
  }

  setArcParam = (e, param) => {
    const { activePath, paths } = this.state
    let { activePoint, points } = paths[activePath],
      v = positive(e.target.value)

    if (["laf", "sf"].indexOf(param) > -1) {
      v = e.target.checked ? 1 : 0
    }

    points[activePoint].arc[param] = v
    paths[activePath].points = points

    this.setState({ paths })
  }

  handleMouseMove = (e) => {
    e.preventDefault()

    if ( ! this.state.ctrl) {
      const { object, anchor } = this.state.dragging

      switch (object) {
        case "point":
          this.setPointCoords(this.getMouseCoords(e))
          break

        case "quadratic":
          this.setQuadraticCoords(this.getMouseCoords(e))
          break

        case "cubic":
          this.setCubicCoords(this.getMouseCoords(e), anchor)
          break
      }
    }
  }

  drag = (e, activePath, activePoint, object = "point", anchor = false) => {
    e.preventDefault()

    const { paths } = this.state

    paths[activePath].activePoint = activePoint

    if ( ! this.state.ctrl) {
      this.setState({
        paths,
        activePath,
        dragging: { object, anchor },
      })
    }
  }

  cancelDragging = (e) => {
    this.setState({ dragging: false })
  }

  render() {
    return (
      <div
        className="ad-Builder"
        onMouseUp={ this.cancelDragging }>
        <Sidebar
          setWidth={ this.setWidth }
          setHeight={ this.setHeight }
          setGridSize={ this.setGridSize }
          setGridSnap={ this.setGridSnap }
          setGridShow={ this.setGridShow }
          addPath={ this.addPath }
          removePath={ this.removePath }
          setPath={ this.setPath }
          setActivePath={ this.setActivePath }
          setRelative={ this.setRelative }
          setClosed={ this.setClosed }
          setFilled={ this.setFilled }
          setPointType={ this.setPointType }
          setPointPosition={ this.setPointPosition }
          setQuadraticPosition={ this.setQuadraticPosition }
          setQuadraticT={ this.setQuadraticT }
          setCubicPosition={ this.setCubicPosition }
          setCubicS={ this.setCubicS }
          setArcParam={ this.setArcParam }
          removePoint={ this.removePoint }
          importSVG={ this.importSVG }
          { ...this.state } />

        <div className="ad-Builder-rendering">
          <div className="ad-Builder-svg">
            <SVG
              ref="svg"
              addPoint={ this.addPoint }
              handleMouseMove={ this.handleMouseMove }
              setActivePath={ this.setActivePath }
              drag={ this.drag }
              { ...this.state } />
          </div>
        </div>
      </div>
    )
  }
}

export default Builder
