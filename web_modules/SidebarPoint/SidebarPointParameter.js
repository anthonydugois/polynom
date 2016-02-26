import React, { PropTypes } from "react"

const SidebarPointParameter = ({ children }) => (
  <div className="ad-SidebarPointParameter">
    { children }
  </div>
)

SidebarPointParameter.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.element,
  ]),
}

export default SidebarPointParameter
