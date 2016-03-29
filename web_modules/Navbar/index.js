import "./styles"

import React from "react"
import { Link } from "react-router"
import Logo from "Logo"

const Navbar = () => (
  <nav className="ad-Navbar">
    <Link
      className="ad-Navbar-logo"
      to="/">
      <Logo size="2rem" />
    </Link>
  </nav>
)

export default Navbar
