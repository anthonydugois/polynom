import React from "react"
import { ButtonExpand } from "Button"
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
    <ButtonExpand onClick={ _onExpandClick }>
      <Icon name={ _isOpened ? "down" : "right" } />
    </ButtonExpand>

    <div className="ad-SidebarPathExpand-caption">
      { children }
    </div>
  </div>
)

export default SidebarPathExpand
