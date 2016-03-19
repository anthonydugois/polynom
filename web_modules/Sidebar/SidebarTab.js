import React from "react"
import { ButtonTab } from "Button"

const SidebarTab = ({
  _onClick,
  children,
}) => (
  <ButtonTab onClick={ _onClick }>
    { children }
  </ButtonTab>
)

export default SidebarTab
