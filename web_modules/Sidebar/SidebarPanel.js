import React, { PropTypes } from "react"

const SidebarPanel = ({ children }) => (
  <div className="ad-SidebarPanel">
    { children }
  </div>
)

SidebarPanel.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.element,
  ]),
}

export default SidebarPanel
