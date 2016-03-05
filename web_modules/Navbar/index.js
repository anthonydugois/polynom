import "./styles"

import React from "react"
import { Link } from "react-router"
import Expand, { ExpandCaption, ExpandPanel } from "Expand"
import NavbarExpand from "./NavbarExpand"

const Navbar = () => (
  <nav className="ad-Navbar">
    <Link to="/">
      Polynom
    </Link>

    <ul className="ad-Navbar-list">
      <li className="ad-Navbar-item">
        <Expand>
          <ExpandCaption>
            <NavbarExpand>
              File
            </NavbarExpand>
          </ExpandCaption>
          <ExpandPanel>
            Hello world
          </ExpandPanel>
        </Expand>
      </li>
    </ul>
  </nav>
)

export default Navbar
