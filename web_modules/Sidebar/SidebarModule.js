import React, { PropTypes } from "react"

const SidebarModule = ({ children }) => (
  <div className="ad-SidebarModule">
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
