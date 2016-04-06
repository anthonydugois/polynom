import "./styles"

import React from "react"
import { Link } from "react-router"
import cx from "classnames"

const Button = ({
  className,
  size,
  type,
  style,
  href,
  to,
  children,
  ...props,
}) => {
  const _className = cx("ad-ButtonReset", "ad-Button", className, type)
  const _style = { height: size, ...style }
  const _content = (
    <div className="ad-Button-content">
      { children }
    </div>
  )

  if (href) {
    return (
      <a
        className={ _className }
        style={ _style }
        href={ href }
        { ...props }>
        { _content }
      </a>
    )
  }

  if (to) {
    return (
      <Link
        className={ _className }
        style={ _style }
        to={ to }
        { ...props }>
        { _content }
      </Link>
    )
  }

  return (
    <button
      type="button"
      className={ _className }
      style={ _style }
      { ...props }>
      { _content }
    </button>
  )
}

export ButtonRounded from "./ButtonRounded"
export ButtonSquare from "./ButtonSquare"

export default Button
