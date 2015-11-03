import React, { Component } from "react"

import Expand from "./Expand"
import General from "Settings/General"
import Path from "Settings/Path"
import Point from "Settings/Point"

import "./styles"

class Sidebar extends Component {
    static propTypes = {
        w: React.PropTypes.number.isRequired,
        h: React.PropTypes.number.isRequired,
        grid: React.PropTypes.object.isRequired,
        path: React.PropTypes.string.isRequired,
        points: React.PropTypes.array.isRequired,
        activePoint: React.PropTypes.number.isRequired,
        closePath: React.PropTypes.bool.isRequired,
        fillPath: React.PropTypes.bool.isRequired,
        relativePoints: React.PropTypes.bool.isRequired,
        setQuadraticPosition: React.PropTypes.func.isRequired,
        setQuadraticT: React.PropTypes.func.isRequired,
        setCubicPosition: React.PropTypes.func.isRequired,
        setCubicS: React.PropTypes.func.isRequired,
        setArcParam: React.PropTypes.func.isRequired,
        setWidth: React.PropTypes.func.isRequired,
        setHeight: React.PropTypes.func.isRequired,
        setClosePath: React.PropTypes.func.isRequired,
        setFillPath: React.PropTypes.func.isRequired,
        setRelativePoints: React.PropTypes.func.isRequired,
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
            closePath,
            fillPath,
            relativePoints,
            points,
            activePoint,
            setWidth,
            setHeight,
            setGridSize,
            setGridSnap,
            setGridShow,
            setClosePath,
            setFillPath,
            setRelativePoints,
            reset,
            setPointType,
            setPointPosition,
            setQuadraticPosition,
            setQuadraticT,
            setCubicPosition,
            setCubicS,
            setArcParam,
            removeActivePoint,
        } = this.props

        return (
            <div className="ad-Sidebar">
                <Expand
                    initialExpanded={ false }
                    title="General settings">
                    <General
                        w={ w }
                        h={ h }
                        grid={ grid }
                        setWidth={ setWidth }
                        setHeight={ setHeight }
                        setGridSize={ setGridSize }
                        setGridSnap={ setGridSnap }
                        setGridShow={ setGridShow } />
                </Expand>

                <Expand
                    initialExpanded={ true }
                    title="Path">
                    <Path
                        path={ path }
                        closePath={ closePath }
                        fillPath={ fillPath }
                        relativePoints={ relativePoints }
                        setClosePath={ setClosePath }
                        setFillPath={ setFillPath }
                        setRelativePoints={ setRelativePoints }
                        reset={ reset } />
                </Expand>

                <Expand
                    initialExpanded={ true }
                    title="Selected point">
                    <Point
                        w={ w }
                        h={ h }
                        grid={ grid }
                        points={ points }
                        activePoint={ activePoint }
                        setPointType={ setPointType }
                        setPointPosition={ setPointPosition }
                        setQuadraticPosition={ setQuadraticPosition }
                        setQuadraticT={ setQuadraticT }
                        setCubicPosition={ setCubicPosition }
                        setCubicS={ setCubicS }
                        setArcParam={ setArcParam }
                        removeActivePoint={ removeActivePoint } />
                </Expand>
            </div>
        )
    }
}

export default Sidebar
