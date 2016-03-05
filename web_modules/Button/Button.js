import "./styles"

import React, { PropTypes } from "react"
import cx from "classnames"

const Button = ({
  className,
  children,
  ...props,
}) => (
  <button
    type="button"
    className={ cx("ad-ButtonReset", "ad-Button", ...className) }
    { ...props }>
    <div className="ad-Button-content">
      { children }
    </div>
  </button>
)

Button.propTypes = {
  className: PropTypes.array,
  children: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.element,
    PropTypes.string,
  ]),
}

export default Button
