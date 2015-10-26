import React from "react"

import Control from "./Control"

function Point(props) {
    const {
        w,
        h,
        grid,
        points,
        activePoint,
        setPointType,
        setPointPosition,
        setQuadraticPosition,
        setQuadraticT,
        setCubicPosition,
        setCubicS,
        setArcParam,
        removeActivePoint,
    } = props

    const active = points[activePoint],
        step = grid.snap ? grid.size : 1

    let previous = false

    if (activePoint !== 0) {
        previous = points[activePoint - 1]
    }

    const choices = [
        { name: "Line", value: "l", checked: (! active.quadratic && ! active.cubic && ! active.arc) },
        { name: "Quad", value: "q", checked: !! active.quadratic },
        { name: "Cub", value: "c", checked: !! active.cubic },
        { name: "Arc", value: "a", checked: !! active.arc },
    ]

    return (
        <div className="ad-Controls-block">
            <h3 className="ad-Controls-title">
                Selected point
            </h3>

            { activePoint !== 0 && (
                <div className="ad-Controls-container">
                    <Control
                        name="Point type"
                        type="choices"
                        id="pointType"
                        choices={ choices }
                        onChange={ setPointType } />
                </div>
            ) }

            <div className="ad-Controls-container">
                <Control
                    name="Point X position"
                    type="range"
                    min={ 0 }
                    max={ w }
                    step={ step }
                    value={ active.x }
                    onChange={ (e) => setPointPosition("x", e) } />
            </div>

            <div className="ad-Controls-container">
                <Control
                    name="Point Y position"
                    type="range"
                    min={ 0 }
                    max={ h }
                    step={ step }
                    value={ active.y }
                    onChange={ (e) => setPointPosition("y", e) } />
            </div>

            { active.quadratic && ! (previous.quadratic && active.quadratic.t) && (
                <div className="ad-Controls-container">
                    <Control
                        name="Anchor X position"
                        type="range"
                        min={ 0 }
                        max={ w }
                        step={ step }
                        value={ active.quadratic.x }
                        onChange={ (e) => setQuadraticPosition("x", e) } />
                </div>
            ) }

            { active.quadratic && ! (previous.quadratic && active.quadratic.t) && (
                <div className="ad-Controls-container">
                    <Control
                        name="Anchor Y position"
                        type="range"
                        min={ 0 }
                        max={ h }
                        step={ step }
                        value={ active.quadratic.y }
                        onChange={ (e) => setQuadraticPosition("y", e) } />
                </div>
            ) }

            { active.quadratic && previous && previous.quadratic && (
                <div className="ad-Controls-container">
                    <Control
                        name="String to previous curve"
                        type="checkbox"
                        checked={ active.quadratic.t }
                        onChange={ setQuadraticT } />
                </div>
            ) }

            { active.cubic && ! (previous.cubic && active.cubic.s) && (
                <div className="ad-Controls-container">
                    <Control
                        name="First anchor X position"
                        type="range"
                        min={ 0 }
                        max={ w }
                        step={ step }
                        value={ active.cubic.x1 }
                        onChange={ (e) => setCubicPosition("x1", e) } />
                </div>
            ) }

            { active.cubic && ! (previous.cubic && active.cubic.s) && (
                <div className="ad-Controls-container">
                    <Control
                        name="First anchor Y position"
                        type="range"
                        min={ 0 }
                        max={ h }
                        step={ step }
                        value={ active.cubic.y1 }
                        onChange={ (e) => setCubicPosition("y1", e) } />
                </div>
            ) }

            { active.cubic && (
                <div className="ad-Controls-container">
                    <Control
                        name="Second anchor X position"
                        type="range"
                        min={ 0 }
                        max={ w }
                        step={ step }
                        value={ active.cubic.x2 }
                        onChange={ (e) => setCubicPosition("x2", e) } />
                </div>
            ) }

            { active.cubic && (
                <div className="ad-Controls-container">
                    <Control
                        name="Second anchor Y position"
                        type="range"
                        min={ 0 }
                        max={ h }
                        step={ step }
                        value={ active.cubic.y2 }
                        onChange={ (e) => setCubicPosition("y2", e) } />
                </div>
            ) }

            { active.cubic && previous && previous.cubic && (
                <div className="ad-Controls-container">
                    <Control
                        name="String to previous curve"
                        type="checkbox"
                        checked={ active.cubic.s }
                        onChange={ setCubicS } />
                </div>
            ) }

            { active.arc && (
                <div className="ad-Controls-container">
                    <Control
                        name="X Radius"
                        type="range"
                        min={ 0 }
                        max={ w }
                        step={ step }
                        value={ active.arc.rx }
                        onChange={ (e) => setArcParam("rx", e) } />
                </div>
            ) }

            { active.arc && (
                <div className="ad-Controls-container">
                    <Control
                        name="Y Radius"
                        type="range"
                        min={ 0 }
                        max={ h }
                        step={ step }
                        value={ active.arc.ry }
                        onChange={ (e) => setArcParam("ry", e) } />
                </div>
            ) }

            { active.arc && (
                <div className="ad-Controls-container">
                    <Control
                        name="Rotation"
                        type="range"
                        min={ 0 }
                        max={ 360 }
                        step={ 1 }
                        value={ active.arc.rot }
                        onChange={ (e) => setArcParam("rot", e) } />
                </div>
            ) }

            { active.arc && (
                <div className="ad-Controls-container">
                    <Control
                        name="Large arc"
                        type="checkbox"
                        checked={ active.arc.laf }
                        onChange={ (e) => setArcParam("laf", e) } />

                    <Control
                        name="Sweep flag"
                        type="checkbox"
                        checked={ active.arc.sf }
                        onChange={ (e) => setArcParam("sf", e) } />
                </div>
            ) }

            { activePoint !== 0 && (
                <div className="ad-Controls-container">
                    <Control
                        type="button"
                        action="delete"
                        value="Remove this point"
                        onClick={ removeActivePoint } />
                </div>
            ) }
        </div>
    )
}

export default Point
