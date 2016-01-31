import React, { PropTypes } from "react"
import cx from "classnames"

const ExpandPanel = ({
  _isOpened,
  children,
}) => (
  <div className={ cx("ad-ExpandPanel", { "is-opened": _isOpened }) }>
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
