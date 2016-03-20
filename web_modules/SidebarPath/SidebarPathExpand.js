import React from "react"
import { ButtonSquare } from "Button"
import {
  MdKeyboardArrowDown,
  MdKeyboardArrowRight,
} from "react-icons/lib/md"

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
      size="1.2rem"
      type="expand"
      onClick={ _onExpandClick }>
      { _isOpened ? (
        <MdKeyboardArrowDown size="1.2rem" />
      ) : (
        <MdKeyboardArrowRight size="1.2rem" />
      ) }
    </ButtonSquare>

    <div className="ad-SidebarPathExpand-caption">
      { children }
    </div>
  </div>
)

export default SidebarPathExpand
