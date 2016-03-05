import "./styles"

import React from "react"
import { Link } from "react-router"
import Expand, { ExpandCaption, ExpandPanel } from "Expand"
import NavbarList from "./NavbarList"
import NavbarItem from "./NavbarItem"
import NavbarLink from "./NavbarLink"
import NavbarExpand from "./NavbarExpand"

const Navbar = () => (
  <nav className="ad-Navbar">
    <Link to="/">
      Polynom
    </Link>

    <NavbarList>
      <NavbarItem>
        <Expand>
          <ExpandCaption>
            <NavbarExpand>
              File
            </NavbarExpand>
          </ExpandCaption>
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
