import React from "react"
import { Link } from "react-router"

const NavbarLink = ({
  to,
  children,
  ...props,
}) => to ? (
  <Link
    className="ad-NavbarLink"
    to={ to }
    { ...props }>
    { children }
  </Link>
) : (
  <span
    className="ad-NavbarLink"
    { ...props }>
    { children }
  </span>
)

export default NavbarLink
