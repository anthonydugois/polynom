import "./styles"

import React from "react"
import cx from "classnames"

const Button = ({
  className,
  size,
  type,
  style,
  children,
  ...props,
}) => (
  <button
    type="button"
    className={ cx("ad-ButtonReset", "ad-Button", className, type) }
    style={{
      height: size,
      ...style,
    }}
    { ...props }>
    <div className="ad-Button-content">
      { children }
    </div>
  </button>
)

export ButtonRounded from "./ButtonRounded"
export ButtonTab from "./ButtonTab"
export ButtonExpand from "./ButtonExpand"

export default Button
