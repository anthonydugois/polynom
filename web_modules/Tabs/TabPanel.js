import React, { PropTypes } from "react"
import cx from "classnames"

const TabPanel = ({
  _isActive,
  children,
}) => {
  return (
    <div className={ cx("ad-TabPanel", { "is-active": _isActive }) }>
      { children }
    </div>
  )
}

TabPanel.propTypes = {
  _isActive: PropTypes.bool,
  children: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.element,
    PropTypes.string,
  ]),
}

export default TabPanel
