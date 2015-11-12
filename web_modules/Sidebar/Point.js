import React from "react"

import Control from "Control"

import "./styles"

function Point(props) {
  const {
    w,
    h,
    grid,
    activePath,
    paths,
    setPointType,
    setPointPosition,
    setQuadraticPosition,
    setQuadraticT,
    setCubicPosition,
    setCubicS,
    setArcParam,
  } = props

  const { activePoint, points } = paths[activePath],
    step = grid.snap ? grid.size : 1,
    point = points[activePoint],
    prev = activePoint > 0 ? points[activePoint - 1] : false

  return (
    <div className="ad-Settings">
      { activePoint > 0 && (
        <div className="ad-Setting">
          <Control
            type="choices"
            choices={ [
              { name: "Move", value: "m", checked: point.type === "m" },
              { name: "Line", value: "l", checked: point.type === "l" },
              { name: "Quad", value: "q", checked: point.type === "q" },
              { name: "Cub", value: "c", checked: point.type === "c" },
              { name: "Arc", value: "a", checked: point.type === "a" },
            ] }
            name="pointType"
            onChange={ setPointType } />
        </div>
      ) }

      <div className="ad-Setting">
        <Control
          label="Point X position"
          type="range"
          min={ 0 }
          max={ w }
          step={ step }
          value={ point.x }
          onChange={ (e) => setPointPosition(e, "x") } />
      </div>

      <div className="ad-Setting">
        <Control
          label="Point Y position"
          type="range"
          min={ 0 }
          max={ h }
          step={ step }
          value={ point.y }
          onChange={ (e) => setPointPosition(e, "y") } />
      </div>

      { point.quadratic && prev && prev.quadratic && (
        <div className="ad-Setting">
          <Control
            label="String to previous curve"
            type="checkbox"
            checked={ point.quadratic.t }
            onChange={ setQuadraticT } />
        </div>
      ) }

      { point.quadratic && ! (prev.quadratic && point.quadratic.t) && (
        <div className="ad-Setting">
          <Control
            label="Anchor X position"
            type="range"
            min={ 0 }
            max={ w }
            step={ step }
            value={ point.quadratic.x }
            onChange={ (e) => setQuadraticPosition(e, "x") } />
        </div>
      ) }

      { point.quadratic && ! (prev.quadratic && point.quadratic.t) && (
        <div className="ad-Setting">
          <Control
            label="Anchor Y position"
            type="range"
            min={ 0 }
            max={ h }
            step={ step }
            value={ point.quadratic.y }
            onChange={ (e) => setQuadraticPosition(e, "y") } />
        </div>
      ) }

      { point.cubic && prev && prev.cubic && (
        <div className="ad-Setting">
          <Control
            label="String to previous curve"
            type="checkbox"
            checked={ point.cubic.s }
            onChange={ setCubicS } />
        </div>
      ) }

      { point.cubic && ! (prev.cubic && point.cubic.s) && (
        <div className="ad-Setting">
          <Control
            label="First anchor X position"
            type="range"
            min={ 0 }
            max={ w }
            step={ step }
            value={ point.cubic.x1 }
            onChange={ (e) => setCubicPosition(e, "x1") } />
        </div>
      ) }

      { point.cubic && ! (prev.cubic && point.cubic.s) && (
        <div className="ad-Setting">
          <Control
            label="First anchor Y position"
            type="range"
            min={ 0 }
            max={ h }
            step={ step }
            value={ point.cubic.y1 }
            onChange={ (e) => setCubicPosition(e, "y1") } />
        </div>
      ) }

      { point.cubic && (
        <div className="ad-Setting">
          <Control
            label="Second anchor X position"
            type="range"
            min={ 0 }
            max={ w }
            step={ step }
            value={ point.cubic.x2 }
            onChange={ (e) => setCubicPosition(e, "x2") } />
        </div>
      ) }

      { point.cubic && (
        <div className="ad-Setting">
          <Control
            label="Second anchor Y position"
            type="range"
            min={ 0 }
            max={ h }
            step={ step }
            value={ point.cubic.y2 }
            onChange={ (e) => setCubicPosition(e, "y2") } />
        </div>
      ) }

      { point.arc && (
        <div className="ad-Setting">
          <Control
            label="X Radius"
            type="range"
            min={ 0 }
            max={ w }
            step={ step }
            value={ point.arc.rx }
            onChange={ (e) => setArcParam(e, "rx") } />
        </div>
      ) }

      { point.arc && (
        <div className="ad-Setting">
          <Control
            label="Y Radius"
            type="range"
            min={ 0 }
            max={ h }
            step={ step }
            value={ point.arc.ry }
            onChange={ (e) => setArcParam(e, "ry") } />
        </div>
      ) }

      { point.arc && (
        <div className="ad-Setting">
          <Control
            label="Rotation"
            type="range"
            min={ 0 }
            max={ 360 }
            step={ 1 }
            value={ point.arc.rot }
            onChange={ (e) => setArcParam(e, "rot") } />
        </div>
      ) }

      { point.arc && (
        <div className="ad-Setting">
          <Control
            label="Large arc"
            type="checkbox"
            checked={ point.arc.laf }
            onChange={ (e) => setArcParam(e, "laf") } />

          <Control
            label="Sweep flag"
            type="checkbox"
            checked={ point.arc.sf }
            onChange={ (e) => setArcParam(e, "sf") } />
        </div>
      ) }
    </div>
  )
}

export default Point
