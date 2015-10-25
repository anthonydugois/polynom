import React from "react"

function Result(props) {
    const {
        path,
    } = props

    return (
        <div className="ad-Result">
            <textarea
                readOnly={ true }
                className="ad-Result-textarea"
                onFocus={ (e) => e.target.select() }
                value={ path } />
        </div>
    )
}

export default Result
