import React, { PropTypes } from "react"

const TabList = ({ children, ...props }) => (
  <div
    className="ad-TabList"
    { ...props }>
    { children }
  </div>
)

TabList.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.element,
  ]),
}

export default TabList
