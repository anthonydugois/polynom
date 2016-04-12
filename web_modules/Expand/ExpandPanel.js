import React, { PropTypes } from "react"

const ExpandPanel = ({
  _isOpened,
  children,
  ...props,
}) => (
  <div
    style={{ display: !_isOpened && "none" }}
    { ...props }>
    { children }
  </div>
)

ExpandPanel.propTypes = {
  _isOpened: PropTypes.bool,
  children: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.element,
    PropTypes.string,
  ]),
}

export default ExpandPanel
