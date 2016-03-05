import React from "react"
import NavbarLink from "./NavbarLink"

const NavbarExpand = ({
  _onClick,
  children,
  ...props,
}) => (
  <NavbarLink
    onClick={ _onClick }
    { ...props }>
    { children }
  </NavbarLink>
)

export default NavbarExpand
