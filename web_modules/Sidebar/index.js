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
        setPointType,
        setPointPosition,
        setQuadraticPosition,
        setQuadraticT,
        setCubicPosition,
        setCubicS,
        setArcParam,
        removeActivePoint,
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
                initialExpanded={ true }
                title="Active point">
                <Point
                    w={ w }
                    h={ h }
                    grid={ grid }
                    activePath={ activePath }
                    paths={ paths }
                    setPointType={ setPointType }
                    setPointPosition={ setPointPosition }
                    setQuadraticPosition={ setQuadraticPosition }
                    setQuadraticT={ setQuadraticT }
                    setCubicPosition={ setCubicPosition }
                    setCubicS={ setCubicS }
                    setArcParam={ setArcParam }
                    removeActivePoint={ removeActivePoint } />
            </Expand>

            { shapes }
        </div>
    )
}

export default Sidebar
