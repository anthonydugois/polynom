import "./styles"

import React from "react"
import cx from "classnames"

const Container = ({
  className,
  children,
  ...props,
}) => (
  <div
    className={ cx("ad-Container", className) }
    { ...props }>
    { children }
  </div>
)

export default Container
