import React, { Component } from "react"

import Control from "./Control"

import "./styles"

class Controls extends Component {
    static propTypes = {
        w: React.PropTypes.number.isRequired,
        h: React.PropTypes.number.isRequired,
        grid: React.PropTypes.object.isRequired,
        path: React.PropTypes.string.isRequired,
        points: React.PropTypes.array.isRequired,
        activePoint: React.PropTypes.number.isRequired,
        closePath: React.PropTypes.bool.isRequired,
        fillPath: React.PropTypes.bool.isRequired,
        setQuadraticPosition: React.PropTypes.func.isRequired,
        setQuadraticT: React.PropTypes.func.isRequired,
        setCubicPosition: React.PropTypes.func.isRequired,
        setCubicS: React.PropTypes.func.isRequired,
        setArcParam: React.PropTypes.func.isRequired,
        setWidth: React.PropTypes.func.isRequired,
        setHeight: React.PropTypes.func.isRequired,
        setClosePath: React.PropTypes.func.isRequired,
        setFillPath: React.PropTypes.func.isRequired,
        setGridSize: React.PropTypes.func.isRequired,
        setGridSnap: React.PropTypes.func.isRequired,
        setGridShow: React.PropTypes.func.isRequired,
        reset: React.PropTypes.func.isRequired,
        setPointType: React.PropTypes.func.isRequired,
        setPointPosition: React.PropTypes.func.isRequired,
        removeActivePoint: React.PropTypes.func.isRequired,
    }

    render() {
        const {
            w,
            h,
            grid,
            path,
            points,
            activePoint,
            closePath,
            fillPath,
            setQuadraticPosition,
            setQuadraticT,
            setCubicPosition,
            setCubicS,
            setArcParam,
            setWidth,
            setHeight,
            setClosePath,
            setFillPath,
            setGridSize,
            setGridSnap,
            setGridShow,
            reset,
            setPointType,
            setPointPosition,
            removeActivePoint,
        } = this.props

        const active = points[activePoint],
            step = grid.snap ? grid.size : 1

        let previous = false

        if (active !== 0) {
            previous = points[activePoint - 1]
        }

        return (
            <div className="ad-Controls">
                <h3 className="ad-Controls-title">
                    General
                </h3>

                <div className="ad-Controls-container">
                    <Control
                        name="Width"
                        type="range"
                        min={ 0 }
                        max={ 1500 }
                        step={ 50 }
                        value={ w }
                        onChange={ setWidth } />
                </div>

                <div className="ad-Controls-container">
                    <Control
                        name="Height"
                        type="range"
                        min={ 0 }
                        max={ 850 }
                        step={ 50 }
                        value={ h }
                        onChange={ setHeight } />
                </div>

                <div className="ad-Controls-container">
                    <Control
                        name="Grid size"
                        type="range"
                        min={ 1 }
                        max={ Math.min(w, h) / 2 }
                        step={ 1 }
                        value={ grid.size }
                        onChange={ setGridSize } />
                </div>

                <div className="ad-Controls-container">
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

                <h3 className="ad-Controls-title">
                    Path
                </h3>

                <div className="ad-Controls-container">
                    <Control
                        name="Path code"
                        type="textarea"
                        readOnly={ true }
                        value={ path } />
                </div>

                <div className="ad-Controls-container">
                    <Control
                        name="Close path"
                        type="checkbox"
                        checked={ closePath }
                        onChange={ setClosePath } />

                    <Control
                        name="Fill path"
                        type="checkbox"
                        checked={ fillPath }
                        onChange={ setFillPath } />
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
                                { name: "Line", value: "l", checked: (! active.quadratic && ! active.cubic && ! active.arc) },
                                { name: "Quad", value: "q", checked: !! active.quadratic },
                                { name: "Cub", value: "c", checked: !! active.cubic },
                                { name: "Arc", value: "a", checked: !! active.arc },
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

                { active.quadratic && (
                    <div>
                        { ! (previous.quadratic && active.quadratic.t) && (
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

                        { ! (previous.quadratic && active.quadratic.t) && (
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

                        { previous && previous.quadratic && (
                            <div className="ad-Controls-container">
                                <Control
                                    name="String to previous curve"
                                    type="checkbox"
                                    checked={ active.quadratic.t }
                                    onChange={ setQuadraticT } />
                            </div>
                        ) }
                    </div>
                ) }

                { active.cubic && (
                    <div>
                        { ! (previous.cubic && active.cubic.s) && (
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

                        { ! (previous.cubic && active.cubic.s) && (
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

                        { previous && previous.cubic && (
                            <div className="ad-Controls-container">
                                <Control
                                    name="String to previous curve"
                                    type="checkbox"
                                    checked={ active.cubic.s }
                                    onChange={ setCubicS } />
                            </div>
                        ) }
                    </div>
                ) }

                { active.arc && (
                    <div>
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
}

export default Controls
