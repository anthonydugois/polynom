import React, { PropTypes } from "react"
import { ButtonExpand } from "Button"
import Icon from "Icon"

const ExpandCaption = ({
  _onClick,
  _isOpened,
  children,
  ...props,
}) => (
  <div
    className="ad-ExpandCaption"
    { ...props }>
    <div className="ad-ExpandCaption-button">
      <ButtonExpand onClick={ _onClick }>
        <Icon name={ _isOpened ? "down" : "right" } />
      </ButtonExpand>
    </div>

    <div className="ad-ExpandCaption-label">
      { children }
    </div>
  </div>
)

ExpandCaption.propTypes = {
  _onClick: PropTypes.func,
  _isOpened: PropTypes.bool,
  children: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.element,
    PropTypes.string,
  ]),
}

export default ExpandCaption
