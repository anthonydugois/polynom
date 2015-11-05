import React from "react"

import Expand from "./Expand"
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
            <Expand
                key={ index }
                initialExpanded={ index === 0 }
                title={ `Path ${ index + 1 }` }
                index={ index }
                activePath={ activePath }
                setActivePath={ setActivePath }
                removePath={ removePath }>
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
            <div className="ad-Sidebar-content">
                <div className="ad-Sidebar-settings">
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

                <div className="ad-Sidebar-settings">
                    { shapes }
                </div>
            </div>

            <div className="ad-Sidebar-actions">
                <Button
                    icon="add"
                    value="New path"
                    onClick={ addPath } />
            </div>
        </div>
    )
}

export default Sidebar
