import React, { PropTypes } from "react"
import cx from "classnames"

const ExpandPanel = ({
  isOpened,
  children,
}) => (
  <div className={ cx("ad-ExpandPanel", { "is-opened": isOpened }) }>
    { children }
  </div>
)

ExpandPanel.propTypes = {
  isOpened: PropTypes.bool,
  children: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.element,
    PropTypes.string,
  ]),
}

export default ExpandPanel
