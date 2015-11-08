import React, { Component } from "react"

import Button from "./Button"

class ButtonFile extends Component {
    static propTypes = {
        onChange: React.PropTypes.func,
    }

    handleClick = (e) => {
        e.preventDefault()

        this.refs.file.click()
    }

    render() {
        const {
            onChange,
            ...props,
        } = this.props

        return (
            <div className="ad-ButtonFile">
                <input
                    ref="file"
                    type="file"
                    className="ad-ButtonFile-file"
                    onChange={ onChange } />

                <Button
                    onClick={ this.handleClick }
                    { ...props } />
            </div>
        )
    }
}

export default ButtonFile
