import React from "react"
import { ButtonSquare } from "Button"

const SidebarTab = ({
  _onTabClick,
  children,
}) => (
  <ButtonSquare
    size="3.5rem"
    style={{ fontSize: ".8rem" }}
    onClick={ _onTabClick }>
    { children }
  </ButtonSquare>
)

export default SidebarTab
