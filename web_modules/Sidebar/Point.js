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
        active = points[activePoint],
        step = grid.snap ? grid.size : 1

    let prev = false

    if (activePoint !== 0) {
        prev = points[activePoint - 1]
    }

    const choices = [
        { name: "Move", value: "m", checked: active.type === "M" },
        { name: "Line", value: "l", checked: active.type === "L" },
        { name: "Quad", value: "q", checked: active.type === "Q" },
        { name: "Cub", value: "c", checked: active.type === "C" },
        { name: "Arc", value: "a", checked: active.type === "A" },
    ]

    return (
        <div className="ad-Settings">
            { activePoint !== 0 && (
                <div className="ad-Setting">
                    <Control
                        type="choices"
                        id="pointType"
                        choices={ choices }
                        onChange={ setPointType } />
                </div>
            ) }

            <div className="ad-Setting">
                <Control
                    name="Point X position"
                    type="range"
                    min={ 0 }
                    max={ w }
                    step={ step }
                    value={ active.x }
                    onChange={ (e) => setPointPosition(e, "x") } />
            </div>

            <div className="ad-Setting">
                <Control
                    name="Point Y position"
                    type="range"
                    min={ 0 }
                    max={ h }
                    step={ step }
                    value={ active.y }
                    onChange={ (e) => setPointPosition(e, "y") } />
            </div>

            { active.quadratic && prev && prev.quadratic && (
                <div className="ad-Setting">
                    <Control
                        name="String to previous curve"
                        type="checkbox"
                        checked={ active.quadratic.t }
                        onChange={ setQuadraticT } />
                </div>
            ) }

            { active.quadratic && ! (prev.quadratic && active.quadratic.t) && (
                <div className="ad-Setting">
                    <Control
                        name="Anchor X position"
                        type="range"
                        min={ 0 }
                        max={ w }
                        step={ step }
                        value={ active.quadratic.x }
                        onChange={ (e) => setQuadraticPosition(e, "x") } />
                </div>
            ) }

            { active.quadratic && ! (prev.quadratic && active.quadratic.t) && (
                <div className="ad-Setting">
                    <Control
                        name="Anchor Y position"
                        type="range"
                        min={ 0 }
                        max={ h }
                        step={ step }
                        value={ active.quadratic.y }
                        onChange={ (e) => setQuadraticPosition(e, "y") } />
                </div>
            ) }

            { active.cubic && prev && prev.cubic && (
                <div className="ad-Setting">
                    <Control
                        name="String to previous curve"
                        type="checkbox"
                        checked={ active.cubic.s }
                        onChange={ setCubicS } />
                </div>
            ) }

            { active.cubic && ! (prev.cubic && active.cubic.s) && (
                <div className="ad-Setting">
                    <Control
                        name="First anchor X position"
                        type="range"
                        min={ 0 }
                        max={ w }
                        step={ step }
                        value={ active.cubic.x1 }
                        onChange={ (e) => setCubicPosition(e, "x1") } />
                </div>
            ) }

            { active.cubic && ! (prev.cubic && active.cubic.s) && (
                <div className="ad-Setting">
                    <Control
                        name="First anchor Y position"
                        type="range"
                        min={ 0 }
                        max={ h }
                        step={ step }
                        value={ active.cubic.y1 }
                        onChange={ (e) => setCubicPosition(e, "y1") } />
                </div>
            ) }

            { active.cubic && (
                <div className="ad-Setting">
                    <Control
                        name="Second anchor X position"
                        type="range"
                        min={ 0 }
                        max={ w }
                        step={ step }
                        value={ active.cubic.x2 }
                        onChange={ (e) => setCubicPosition(e, "x2") } />
                </div>
            ) }

            { active.cubic && (
                <div className="ad-Setting">
                    <Control
                        name="Second anchor Y position"
                        type="range"
                        min={ 0 }
                        max={ h }
                        step={ step }
                        value={ active.cubic.y2 }
                        onChange={ (e) => setCubicPosition(e, "y2") } />
                </div>
            ) }

            { active.arc && (
                <div className="ad-Setting">
                    <Control
                        name="X Radius"
                        type="range"
                        min={ 0 }
                        max={ w }
                        step={ step }
                        value={ active.arc.rx }
                        onChange={ (e) => setArcParam(e, "rx") } />
                </div>
            ) }

            { active.arc && (
                <div className="ad-Setting">
                    <Control
                        name="Y Radius"
                        type="range"
                        min={ 0 }
                        max={ h }
                        step={ step }
                        value={ active.arc.ry }
                        onChange={ (e) => setArcParam(e, "ry") } />
                </div>
            ) }

            { active.arc && (
                <div className="ad-Setting">
                    <Control
                        name="Rotation"
                        type="range"
                        min={ 0 }
                        max={ 360 }
                        step={ 1 }
                        value={ active.arc.rot }
                        onChange={ (e) => setArcParam(e, "rot") } />
                </div>
            ) }

            { active.arc && (
                <div className="ad-Setting">
                    <Control
                        name="Large arc"
                        type="checkbox"
                        checked={ active.arc.laf }
                        onChange={ (e) => setArcParam(e, "laf") } />

                    <Control
                        name="Sweep flag"
                        type="checkbox"
                        checked={ active.arc.sf }
                        onChange={ (e) => setArcParam(e, "sf") } />
                </div>
            ) }
        </div>
    )
}

export default Point
