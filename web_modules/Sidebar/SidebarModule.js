import React, { PropTypes } from "react"

const SidebarModule = ({ children, ...props }) => (
  <div
    className="ad-SidebarModule"
    { ...props }>
    { children }
  </div>
)

SidebarModule.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.element,
  ]),
}

export default SidebarModule
