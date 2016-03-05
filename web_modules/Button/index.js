import "./styles"

import React, { PropTypes } from "react"
import cx from "classnames"

function getStyles(size, style) {
  return {
    height: size,
    ...style,
  }
}

const Button = ({
  size,
  className,
  style,
  children,
  ...props,
}) => (
  <button
    type="button"
    className={ cx("ad-ButtonReset", "ad-Button", ...className) }
    style={ getStyles(size, style) }
    { ...props }>
    <div className="ad-Button-content">
      { children }
    </div>
  </button>
)

Button.propTypes = {
  size: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  className: PropTypes.array,
  children: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.element,
    PropTypes.string,
  ]),
}

export ButtonPrimary from "./ButtonPrimary"
export ButtonDelete from "./ButtonDelete"
export ButtonExpand from "./ButtonExpand"
export ButtonCircle from "./ButtonCircle"
export ButtonTab from "./ButtonTab"
export default Button
