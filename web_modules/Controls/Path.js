import React from "react"

import Control from "./Control"

function Path(props) {
    const {
        path,
        closePath,
        fillPath,
        relativePoints,
        setClosePath,
        setFillPath,
        setRelativePoints,
        reset,
    } = props

    return (
        <div className="ad-Controls-block">
            <h3 className="ad-Controls-title">
                Path
            </h3>

            <div className="ad-Controls-container">
                <Control
                    name="Path code"
                    type="textarea"
                    readOnly={ true }
                    value={ path }
                    onFocus={ (e) => e.target.select() } />
            </div>

            <div className="ad-Controls-container">
                <Control
                    name="Relative"
                    type="checkbox"
                    checked={ relativePoints }
                    onChange={ setRelativePoints } />

                <Control
                    name="Close"
                    type="checkbox"
                    checked={ closePath }
                    onChange={ setClosePath } />

                <Control
                    name="Fill"
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
        </div>
    )
}

export default Path
