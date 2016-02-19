import React, { PropTypes } from "react"

const SidebarActions = ({ children }) => (
  <div className="ad-SidebarActions">
    { children }
  </div>
)

SidebarActions.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.element,
  ]),
}

export default SidebarActions
