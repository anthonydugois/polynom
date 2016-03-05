import React from "react"
import cx from "classnames"

const NavbarExpand = ({
  _onClick,
  _isOpened,
  children,
  ...props,
}) => (
  <div
    className={ cx("ad-NavbarExpand", { "is-opened": _isOpened }) }
    onClick={ _onClick }
    { ...props }>
    { children }
  </div>
)

export default NavbarExpand
