import React, { Component, PropTypes } from "react"

class TabList extends Component {
  render() {
    const { children } = this.props

    return (
      <ul className="ad-TabList">
        { children }
      </ul>
    )
  }
}

TabList.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.element,
  ]),
}

export default TabList
