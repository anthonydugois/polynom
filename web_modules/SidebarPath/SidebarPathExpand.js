import React from "react"
import { ButtonExpand } from "Button"
import Icon from "Icon"

const SidebarPathExpand = ({
  _onClick,
  _isOpened,
  ...props,
}) => (
  <ButtonExpand
    onClick={ _onClick }
    { ...props }>
    <Icon name={ _isOpened ? "down" : "right" } />
  </ButtonExpand>
)

export default SidebarPathExpand
