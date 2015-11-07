import React, { Component } from "react"
import cx from "classnames"

import Icon from "Icon"
import Tab from "./Tab"

import "./styles"

class Tabs extends Component {
    static propTypes = {
        tabs: React.PropTypes.arrayOf(React.PropTypes.shape({
            icon: React.PropTypes.string.isRequired,
            title: React.PropTypes.string.isRequired,
        })).isRequired,
        children: React.PropTypes.any.isRequired,
    }

    state = {
        activeTab: 0,
    }

    setActiveTab = (e, activeTab) => {
        e.preventDefault()

        this.setState({ activeTab })
    }

    render() {
        const { tabs, children } = this.props
        const { activeTab } = this.state

        const list = tabs.map((tab, index) => {
            return (
                <li
                    key={ index }
                    className="ad-Tabs-item">
                    <button
                        className={ cx("ad-TabsButton", { "is-active": index === activeTab }) }
                        onClick={ (e) => this.setActiveTab(e, index) }>
                        <Icon name={ tab.icon } />
                        <span className="ad-TabsButton-text">
                            { tab.title }
                        </span>
                    </button>
                </li>
            )
        })

        const _tabs = children.map((child, index) => {
            return (
                <Tab
                    key={ index }
                    active={ index === activeTab }>
                    { child }
                </Tab>
            )
        })

        return (
            <div className="ad-Tabs">
                <ul className="ad-Tabs-nav">
                    { list }
                </ul>

                <div className="ad-Tabs-tabs">
                    { _tabs }
                </div>
            </div>
        )
    }
}

export default Tabs
