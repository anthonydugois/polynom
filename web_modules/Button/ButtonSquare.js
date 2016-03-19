import React from "react"
import Button from "Button"

const ButtonSquare = ({
  size,
  style,
  children,
  ...props,
}) => (
  <Button
    className="ad-ButtonSquare"
    size={ size }
    style={{
      width: size,
      ...style,
    }}
    { ...props }>
    { children }
  </Button>
)

export default ButtonSquare
