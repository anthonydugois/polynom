import React from "react"
import NavbarLink from "./NavbarLink"

const NavbarExpand = ({
  _onExpandClick,
  children,
  ...props,
}) => (
  <NavbarLink
    onClick={ _onExpandClick }
    { ...props }>
    { children }
  </NavbarLink>
)

export default NavbarExpand
