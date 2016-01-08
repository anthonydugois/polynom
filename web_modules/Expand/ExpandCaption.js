import React, { PropTypes } from "react"
import Button from "Button"

const ExpandCaption = ({
  isOpened,
  onClick,
  children,
}) => (
  <div className="ad-ExpandCaption">
    <div className="ad-ExpandCaption-button">
      <Button
        type="expand"
        icon={ isOpened ? "down" : "right" }
        onClick={ onClick } />
    </div>

    <div className="ad-ExpandCaption-label">
      { children }
    </div>
  </div>
)

ExpandCaption.propTypes = {
  isOpened: PropTypes.bool,
  onClick: PropTypes.func,
  children: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.element,
    PropTypes.string,
  ]),
}

export default ExpandCaption
