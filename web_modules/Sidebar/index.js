import React from "react"

import Tabs from "Tabs"

import General from "./General"
import Path from "./Path"
import Point from "./Point"
import Button from "Button"

import About from "App/About"
import Help from "App/Help"

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
        setPath,
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
        removePoint,
        importSVG,
        exportSVG,
    } = props

    const shapes = paths.map((path, index, _paths) => {
        return (
            <Path
                key={ index }
                index={ index }
                initialExpanded={ index === 0 }
                nbPaths={ _paths.length }
                path={ path }
                activePath={ activePath }
                setActivePath={ setActivePath }
                setPath={ setPath }
                removePath={ removePath }
                setRelative={ setRelative }
                setClosed={ setClosed }
                setFilled={ setFilled } />
        )
    })

    const tabs = [
        {
            icon: "paths",
            title: "Paths",
        },
        {
            icon: "point",
            title: "Point",
        },
        {
            icon: "settings",
            title: "Settings",
        },
        {
            icon: "help",
            title: "Help",
        },
        {
            icon: "about",
            title: "About",
        },
    ]

    return (
        <div className="ad-Sidebar">
            <Tabs
                tabs={ tabs }
                initialActive={ 1 }>
                <div className="ad-Sidebar-tab">
                    <div className="ad-Sidebar-settings">
                        { shapes }
                    </div>

                    <div className="ad-Sidebar-actions">
                        <Button
                            icon="add"
                            value="New path"
                            onClick={ addPath } />
                    </div>
                </div>

                <div className="ad-Sidebar-tab">
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
                            setArcParam={ setArcParam } />
                    </div>

                    { paths[activePath].activePoint !== 0 && (
                        <div className="ad-Sidebar-actions">
                            <Button
                                action="delete"
                                value="Remove"
                                onClick={ (e) => removePoint(e, activePath, paths[activePath].activePoint) } />
                        </div>
                    ) }
                </div>

                <div className="ad-Sidebar-tab">
                    <div className="ad-Sidebar-settings">
                        <General
                            w={ w }
                            h={ h }
                            grid={ grid }
                            paths={ paths }
                            setWidth={ setWidth }
                            setHeight={ setHeight }
                            setGridSize={ setGridSize }
                            setGridSnap={ setGridSnap }
                            setGridShow={ setGridShow }
                            importSVG={ importSVG } />
                    </div>
                </div>

                <div className="ad-Sidebar-tab">
                    <div className="ad-Sidebar-settings">
                        <Help />
                    </div>
                </div>

                <div className="ad-Sidebar-tab">
                    <div className="ad-Sidebar-settings">
                        <About />
                    </div>
                </div>
            </Tabs>
        </div>
    )
}

export default Sidebar
