import React, { Component } from "react"
import cx from "classnames"

import Icon from "Icon"

class Expand extends Component {
    static propTypes = {
        initialExpanded: React.PropTypes.bool.isRequired,
        title: React.PropTypes.string.isRequired,
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
        return (
            <div className={ cx("ad-Expand", { "is-expanded": this.state.expanded }) }>
                <div className="ad-Expand-head">
                    <button
                        className="ad-Expand-button"
                        onClick={ this.handleClick }>
                        <Icon name="" />
                    </button>

                    <h4 className="ad-Expand-title">
                        { this.props.title }
                    </h4>
                </div>

                <div className="ad-Expand-content">
                    { this.props.children }
                </div>
            </div>
        )
    }
}

export default Expand
