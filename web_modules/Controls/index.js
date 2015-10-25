import React from "react"

import Control from "./Control"

import "./styles"

function Controls(props) {
    const {
        w,
        h,
        points,
        activePoint,
        grid,
        setQuadraticPosition,
        setCubicPosition,
        setArcParam,
        setWidth,
        setHeight,
        closePath,
        setClosePath,
        setGridSize,
        setGridSnap,
        setGridShow,
        reset,
        setPointType,
        setPointPosition,
        removeActivePoint,
    } = props

    const active = points[activePoint],
        step = grid.snap ? grid.size : 1

    let params = []

    if (active.q) {
        params.push(
            <div className="ad-Controls-container">
                <Control
                    name="Control point X position"
                    type="range"
                    min={ 0 }
                    max={ w }
                    step={ step }
                    value={ active.q.x }
                    onChange={ (e) => setQuadraticPosition("x", e) } />
            </div>
        )

        params.push(
            <div className="ad-Controls-container">
                <Control
                    name="Control point Y position"
                    type="range"
                    min={ 0 }
                    max={ h }
                    step={ step }
                    value={ active.q.y }
                    onChange={ (e) => setQuadraticPosition("y", e) } />
            </div>
        )
    } else if (active.c) {
        params.push(
            <div className="ad-Controls-container">
                <Control
                    name="First control point X position"
                    type="range"
                    min={ 0 }
                    max={ w }
                    step={ step }
                    value={ active.c[0].x }
                    onChange={ (e) => setCubicPosition("x", 0, e) } />
            </div>
        )

        params.push(
            <div className="ad-Controls-container">
                <Control
                    name="First control point Y position"
                    type="range"
                    min={ 0 }
                    max={ h }
                    step={ step }
                    value={ active.c[0].y }
                    onChange={ (e) => setCubicPosition("y", 0, e) } />
            </div>
        )

        params.push(
            <div className="ad-Controls-container">
                <Control
                    name="Second control point X position"
                    type="range"
                    min={ 0 }
                    max={ w }
                    step={ step }
                    value={ active.c[1].x }
                    onChange={ (e) => setCubicPosition("x", 1, e) } />
            </div>
        )

        params.push(
            <div className="ad-Controls-container">
                <Control
                    name="Second control point Y position"
                    type="range"
                    min={ 0 }
                    max={ h }
                    step={ step }
                    value={ active.c[1].y }
                    onChange={ (e) => setCubicPosition("y", 1, e) } />
            </div>
        )
    } else if (active.a) {
        params.push(
            <div className="ad-Controls-container">
                <Control
                    name="X Radius"
                    type="range"
                    min={ 0 }
                    max={ w }
                    step={ step }
                    value={ active.a.rx }
                    onChange={ (e) => setArcParam("rx", e) } />
            </div>
        )

        params.push(
            <div className="ad-Controls-container">
                <Control
                    name="Y Radius"
                    type="range"
                    min={ 0 }
                    max={ h }
                    step={ step }
                    value={ active.a.ry }
                    onChange={ (e) => setArcParam("ry", e) } />
            </div>
        )

        params.push(
            <div className="ad-Controls-container">
                <Control
                    name="Rotation"
                    type="range"
                    min={ 0 }
                    max={ 360 }
                    step={ 1 }
                    value={ active.a.rot }
                    onChange={ (e) => setArcParam("rot", e) } />
            </div>
        )

        params.push(
            <div className="ad-Controls-container">
                <Control
                    name="Large arc sweep flag"
                    type="checkbox"
                    checked={ active.a.laf }
                    onChange={ (e) => setArcParam("laf", e) } />
            </div>
        )

        params.push(
            <div className="ad-Controls-container">
                <Control
                    name="Sweep flag"
                    type="checkbox"
                    checked={ active.a.sf }
                    onChange={ (e) => setArcParam("sf", e) } />
            </div>
        )
    }

    return (
        <div className="ad-Controls">
            <h3 className="ad-Controls-title">
                Parameters
            </h3>

            <div className="ad-Controls-container">
                <Control
                    name="Width"
                    type="text"
                    value={ w }
                    onChange={ setWidth } />

                <Control
                    name="Height"
                    type="text"
                    value={ h }
                    onChange={ setHeight } />

                <Control
                    name="Close path"
                    type="checkbox"
                    value={ closePath }
                    onChange={ setClosePath } />
            </div>

            <div className="ad-Controls-container">
                <Control
                    name="Grid size"
                    type="text"
                    value={ grid.size }
                    onChange={ setGridSize } />
                <Control
                    name="Snap grid"
                    type="checkbox"
                    checked={ grid.snap }
                    onChange={ setGridSnap } />
                <Control
                    name="Show grid"
                    type="checkbox"
                    checked={ grid.show }
                    onChange={ setGridShow } />
            </div>

            <div className="ad-Controls-container">
                <Control
                    type="button"
                    action="reset"
                    value="Reset path"
                    onClick={ reset } />
            </div>

            <h3 className="ad-Controls-title">
                Selected point
            </h3>

            { activePoint !== 0 && (
                <div className="ad-Controls-container">
                    <Control
                        name="Point type"
                        type="choices"
                        id="pointType"
                        choices={ [
                            { name: "L", value: "l", checked: (!active.q && !active.c && !active.a) },
                            { name: "Q", value: "q", checked: !!active.q },
                            { name: "C", value: "c", checked: !!active.c },
                            { name: "A", value: "a", checked: !!active.a },
                        ] }
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

            { params }

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

export default Controls
