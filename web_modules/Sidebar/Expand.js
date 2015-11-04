import React, { Component } from "react"
import cx from "classnames"

import Icon from "Icon"

class Expand extends Component {
    static propTypes = {
        initialExpanded: React.PropTypes.bool.isRequired,
        title: React.PropTypes.string.isRequired,
        active: React.PropTypes.bool,
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
        const { expanded } = this.state
        const { active, title, children } = this.props

        return (
            <div className={ cx("ad-Expand", {
                "is-active": active,
                "is-expanded": expanded,
            }) }>
                <div className="ad-Expand-head">
                    <button
                        className="ad-Expand-button"
                        onClick={ this.handleClick }>
                        <Icon name={ expanded ? "down" : "right" } />
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
