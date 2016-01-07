import React, { PropTypes } from "react"
import cx from "classnames"

const TabPanel = ({
  isActive,
  children,
}) => {
  return (
    <div className={ cx("ad-TabPanel", { "is-active": isActive }) }>
      { children }
    </div>
  )
}

TabPanel.propTypes = {
  isActive: PropTypes.bool,
  children: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.element,
  ]),
}

export default TabPanel
