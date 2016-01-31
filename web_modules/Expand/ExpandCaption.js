import React, { PropTypes } from "react"
import Button from "Button"

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
      <Button
        type="expand"
        icon={ _isOpened ? "down" : "right" }
        onClick={ _onClick } />
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
