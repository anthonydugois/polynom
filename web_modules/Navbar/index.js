import "./styles"

import React from "react"
import { Link } from "react-router"

const Navbar = () => (
  <nav className="ad-Navbar">
    <Link to="/">
      Polynom
    </Link>

    <ul className="ad-Navbar-list">
      <li className="ad-Navbar-item">
        File
      </li>
    </ul>
  </nav>
)

export default Navbar
