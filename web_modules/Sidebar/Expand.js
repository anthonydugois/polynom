import React, { Component } from "react"
import cx from "classnames"

import Icon from "Icon"

class Expand extends Component {
    static propTypes = {
        initialExpanded: React.PropTypes.bool.isRequired,
        title: React.PropTypes.string.isRequired,
        index: React.PropTypes.number.isRequired,
        activePath: React.PropTypes.number.isRequired,
        setActivePath: React.PropTypes.func.isRequired,
        removePath: React.PropTypes.func.isRequired,
        children: React.PropTypes.element.isRequired,
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
            title,
            index,
            activePath,
            setActivePath,
            removePath,
            children,
        } = this.props

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
                        { title }
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
                    { children }
                </div>
            </div>
        )
    }
}

export default Expand
