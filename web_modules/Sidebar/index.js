import React from "react"

import Expand from "./Expand"
import General from "Settings/General"
import Path from "Settings/Path"
import Point from "Settings/Point"

import "./styles"

function Sidebar(props) {
    const {
        w,
        h,
        grid,
        activePath,
        paths,
        setWidth,
        setHeight,
        setGridSize,
        setGridSnap,
        setGridShow,
        setActivePath,
        setRelative,
        setClosed,
        setFilled,
        /*setClosePath,
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
        removeActivePoint,*/
    } = props

    const shapes = paths.map((path, index) => {
        return (
            <Expand
                key={ index }
                initialExpanded={ false }
                title={ `Path ${ index + 1 }` }
                index={ index }
                activePath={ activePath }
                setActivePath={ setActivePath }>
                <Path
                    index={ index }
                    path={ path }
                    setRelative={ setRelative }
                    setClosed={ setClosed }
                    setFilled={ setFilled } />
            </Expand>
        )
    })

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

            { shapes }
        </div>
    )

    /*return (
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
    )*/
}

export default Sidebar
