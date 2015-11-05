import React from "react"
import Control from "Control"
import { getPath } from "../../src/utils/path"
import "./styles"

function Path(props) {
    const {
        index,
        path,
        setRelative,
        setClosed,
        setFilled,
    } = props

    const {
        closed,
        filled,
        relative,
        points,
    } = path

    return (
        <div className="ad-Settings">
            <div className="ad-Setting">
                <Control
                    type="textarea"
                    readOnly={ true }
                    value={ getPath(points, closed, relative) }
                    onFocus={ (e) => e.target.select() } />
            </div>

            <div className="ad-Setting">
                <Control
                    name="Relative"
                    type="checkbox"
                    checked={ relative }
                    onChange={ (e) => setRelative(e, index) } />
                <Control
                    name="Closed"
                    type="checkbox"
                    checked={ closed }
                    onChange={ (e) => setClosed(e, index) } />
                <Control
                    name="Filled"
                    type="checkbox"
                    checked={ filled }
                    onChange={ (e) => setFilled(e, index) } />
            </div>
        </div>
    )
}

/*function Path(props) {
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
        <div className="ad-Settings">
            <div className="ad-Setting">
                <Control
                    name="Path code"
                    type="textarea"
                    readOnly={ true }
                    value={ path }
                    onFocus={ (e) => e.target.select() } />
            </div>

            <div className="ad-Setting">
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

            <div className="ad-Setting">
                <Control
                    type="button"
                    action="reset"
                    value="Reset path"
                    onClick={ reset } />
            </div>
        </div>
    )
}*/

export default Path
