import React, { PropTypes } from "react"
import cx from "classnames"

const Tab = ({
  _onClick,
  _isActive,
  children,
}) => (
  <li
    className={ cx("ad-Tab", { "is-active": _isActive }) }
    onClick={ _onClick }>
    { children }
  </li>
)

Tab.propTypes = {
  _onClick: PropTypes.func,
  _isActive: PropTypes.bool,
  children: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.element,
    PropTypes.string,
  ]),
}

export default Tab
