import React, { Component } from "react"
import cx from "classnames"

import Control from "Control"
import Icon from "Icon"

import getPath from "../../src/utils/path"

class Path extends Component {
    static propTypes = {
        index: React.PropTypes.number.isRequired,
        initialExpanded: React.PropTypes.bool.isRequired,
        path: React.PropTypes.object.isRequired,
        activePath: React.PropTypes.number.isRequired,
        setActivePath: React.PropTypes.func.isRequired,
        removePath: React.PropTypes.func.isRequired,
        setRelative: React.PropTypes.func.isRequired,
        setClosed: React.PropTypes.func.isRequired,
        setFilled: React.PropTypes.func.isRequired,
    }

    state = {
        expanded: this.props.initialExpanded,
    }

    handleClick = (e) => {
        e.preventDefault()

        const expanded = ! this.state.expanded

        this.setState({ expanded })
    }

    render() {
        const {
            index,
            activePath,
            setActivePath,
            removePath,
            setRelative,
            setClosed,
            setFilled,
        } = this.props

        const {
            points,
            closed,
            relative,
        } = this.props.path

        return (
            <div className={ cx("ad-Expand", {
                "is-active": index === activePath,
                "is-expanded": this.state.expanded,
            }) }>
                <div
                    className="ad-Expand-head"
                    onClick={ (e) => setActivePath(e, index) }>
                    <button
                        className="ad-Expand-button"
                        onClick={ this.handleClick }>
                        <Icon name={ this.state.expanded ? "down" : "right" } />
                    </button>

                    <h4 className="ad-Expand-title">
                        Path { index + 1 }
                    </h4>

                    <div className="ad-Expand-actions">
                        { index !== 0 && (
                            <button
                                className="ad-Expand-button"
                                onClick={ (e) => removePath(e, index) }>
                                <Icon name="close" />
                            </button>
                        ) }
                    </div>
                </div>

                <div className="ad-Expand-content">
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
                </div>
            </div>
        )
    }
}

export default Path
