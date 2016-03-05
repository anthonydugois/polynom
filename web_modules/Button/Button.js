import "./styles"

import React, { PropTypes } from "react"
import cx from "classnames"

function getStyles(props) {
  const { size } = props

  return {
    height: size,
  }
}

const Button = ({
  className,
  children,
  ...props,
}) => (
  <button
    type="button"
    className={ cx("ad-ButtonReset", "ad-Button", ...className) }
    style={ getStyles(props) }
    { ...props }>
    <div className="ad-Button-content">
      { children }
    </div>
  </button>
)

Button.propTypes = {
  className: PropTypes.array,
  size: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  children: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.element,
    PropTypes.string,
  ]),
}

export default Button
