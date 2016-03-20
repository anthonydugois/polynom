import "./styles"

import React from "react"
import { Link } from "react-router"
import Icon from "Icon"

const Navbar = () => (
  <nav className="ad-Navbar">
    <Link
      className="ad-Navbar-logo"
      to="/">
      <Icon name="polynom" />
    </Link>
  </nav>
)

export default Navbar
