import "./styles"

import React, { Component, PropTypes } from "react"

class Tabs extends Component {
  state = { selected: this.props.selected };

  setSelected(selected) {
    if (selected !== this.state.selected) {
      this.setState({ selected })
    }
  }

  handleClick(tab) {
    return () => this.setSelected(tab)
  }

  renderTabList(child) {
    let tab = 0

    return React.cloneElement(child, {
      children: React.Children.map(child.props.children, (childTab) => {
        if (childTab.props.isTabHandler) {
          const _isActive = tab === this.state.selected
          const _onTabClick = this.handleClick(tab)

          tab++

          return React.cloneElement(childTab, {
            ...childTab.props,
            _isActive,
            _onTabClick,
          })
        }

        return childTab
      }),
    })
  }

  renderChildren(children) {
    let panel = 0

    return React.Children.map(children, (child) => {
      if (child.type.name === "TabList") {
        return this.renderTabList(child)
      }

      if (child.type.name === "TabPanel") {
        const _isActive = panel === this.state.selected

        panel++

        return React.cloneElement(child, {
          ...child.props,
          _isActive,
        })
      }

      return child
    })
  }

  render() {
    const {
      children,
      ...props,
    } = this.props

    return (
      <div { ...props }>
        { this.renderChildren(children) }
      </div>
    )
  }
}

Tabs.propTypes = {
  selected: PropTypes.number.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.element,
  ]).isRequired,
}

export TabList from "./TabList"
export TabPanel from "./TabPanel"

export default Tabs
