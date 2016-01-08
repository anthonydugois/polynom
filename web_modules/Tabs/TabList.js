import React, { PropTypes } from "react"

const TabList = ({
  children,
}) => (
  <ul className="ad-TabList">
    { children }
  </ul>
)

TabList.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.element,
  ]),
}

export default TabList
