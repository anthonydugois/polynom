import React, { PropTypes } from "react"
import cx from "classnames"

const Tab = ({
  onClick,
  isActive,
  children,
}) => (
  <li
    className={ cx("ad-Tab", { "is-active": isActive }) }
    onClick={ onClick }>
    { children }
  </li>
)

Tab.propTypes = {
  onClick: PropTypes.func,
  isActive: PropTypes.bool,
  children: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.element,
    PropTypes.string,
  ]),
}

export default Tab
