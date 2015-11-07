import React from "react"

import Path from "./Path"
import Point from "./Point"
import Button from "Control/Button"

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
        addPath,
        removePath,
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
            <Path
                key={ index }
                index={ index }
                initialExpanded={ index === 0 }
                path={ path }
                activePath={ activePath }
                setActivePath={ setActivePath }
                removePath={ removePath }
                setRelative={ setRelative }
                setClosed={ setClosed }
                setFilled={ setFilled } />
        )
    })

    return (
        <div className="ad-Sidebar">
            <div className="ad-Sidebar-settings">
                <div className="ad-Sidebar-content">
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
                </div>
            </div>

            <div className="ad-Sidebar-settings">
                <div className="ad-Sidebar-content">
                    { shapes }
                </div>

                <div className="ad-Sidebar-actions">
                    <Button
                        icon="add"
                        value="New path"
                        onClick={ addPath } />
                </div>
            </div>
        </div>
    )
}

export default Sidebar
