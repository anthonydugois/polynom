import React from "react"
import { ButtonSquare } from "Button"
import Icon from "Icon"

const SidebarPathExpand = ({
  _onExpandClick,
  _isOpened,
  children,
  ...props,
}) => (
  <div
    className="ad-SidebarPathExpand"
    { ...props }>
    <ButtonSquare
      size="1.5rem"
      onClick={ _onExpandClick }>
      <Icon name={ _isOpened ? "down" : "right" } />
    </ButtonSquare>

    <div className="ad-SidebarPathExpand-caption">
      { children }
    </div>
  </div>
)

export default SidebarPathExpand
