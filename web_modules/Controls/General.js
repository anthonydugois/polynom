import React from "react"

import Control from "./Control"

function General(props) {
    const {
        w,
        h,
        grid,
        setWidth,
        setHeight,
        setGridSize,
        setGridSnap,
        setGridShow,
    } = props

    return (
        <div className="ad-Controls-block">
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
        </div>
    )
}

export default General
