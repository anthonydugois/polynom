import "./styles"

import React from "react"
import { Link } from "react-router"
import Expand, { ExpandPanel } from "Expand"
import NavbarList from "./NavbarList"
import NavbarItem from "./NavbarItem"
import NavbarLink from "./NavbarLink"
import NavbarExpand from "./NavbarExpand"

const Navbar = () => (
  <nav className="ad-Navbar">
    <Link
      className="ad-Navbar-logo"
      to="/">
      Polynom
    </Link>

    <NavbarList>
      <NavbarItem>
        <Expand documentPropagation>
          <NavbarExpand isExpandHandler>
            File
          </NavbarExpand>
          <ExpandPanel>
            File links
          </ExpandPanel>
        </Expand>
      </NavbarItem>

      <NavbarItem>
        <NavbarLink to="/about">
          About
        </NavbarLink>
      </NavbarItem>
    </NavbarList>
  </nav>
)

export default Navbar
