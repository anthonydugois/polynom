import React, { PropTypes } from "react"

const TabPanel = ({
  _isActive,
  children,
  ...props,
}) => (
  <div
    className="ad-TabPanel"
    style={{ display: !_isActive && "none" }}
    { ...props }>
    { children }
  </div>
)

TabPanel.displayName = "TabPanel"

TabPanel.propTypes = {
  _isActive: PropTypes.bool,
  children: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.element,
    PropTypes.string,
  ]),
}

export default TabPanel
