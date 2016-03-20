import React from "react"
import { ButtonSquare } from "Button"

const SidebarTab = ({
  _isActive,
  _onTabClick,
  children,
}) => (
  <ButtonSquare
    size="3.5rem"
    type={{
      "expand": true,
      "active": _isActive,
    }}
    style={{ fontSize: ".8rem" }}
    onClick={ _onTabClick }>
    { children }
  </ButtonSquare>
)

export default SidebarTab
