import React, { Component, PropTypes } from "react"
import cx from "classnames"

class Tab extends Component {
  handleClick = (e) => {
    e.preventDefault()

    this.props.onClick()
  };

  render() {
    const {
      isActive,
      children,
    } = this.props

    return (
      <li
        className={ cx("ad-Tab", { "is-active": isActive }) }
        onClick={ this.handleClick }>
        { children }
      </li>
    )
  }
}

Tab.propTypes = {
  onClick: PropTypes.func,
  isActive: PropTypes.bool,
  children: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.element,
  ]),
}

export default Tab
