import React from "react"
import { ButtonSquare } from "Button"

const SidebarTab = ({
  _isActive,
  _onTabClick,
  children,
}) => (
  <ButtonSquare
    size="3rem"
    type={{
      "tab": true,
      "active": _isActive,
    }}
    style={{ fontSize: ".75rem" }}
    onClick={ _onTabClick }>
    { children }
  </ButtonSquare>
)

export default SidebarTab
