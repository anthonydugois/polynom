import React, { Component } from "react"
import cx from "classnames"

import Icon from "Icon"

class Expand extends Component {
    static propTypes = {
        initialExpanded: React.PropTypes.bool.isRequired,
        title: React.PropTypes.string.isRequired,
        index: React.PropTypes.number,
        activePath: React.PropTypes.number,
        setActivePath: React.PropTypes.func,
        children: React.PropTypes.element,
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
            children,
        } = this.props

        const isPath = typeof index !== "undefined" && typeof activePath !== "undefined"

        return (
            <div className={ cx("ad-Expand", {
                "is-active": isPath && index === activePath,
                "is-expanded": this.state.expanded,
            }) }>
                <div
                    className="ad-Expand-head"
                    onClick={ (e) => isPath && setActivePath(e, index) }>
                    <button
                        className="ad-Expand-button"
                        onClick={ this.handleClick }>
                        <Icon name={ this.state.expanded ? "down" : "right" } />
                    </button>

                    <h4 className="ad-Expand-title">
                        { title }
                    </h4>
                </div>

                <div className="ad-Expand-content">
                    { children }
                </div>
            </div>
        )
    }
}

export default Expand
