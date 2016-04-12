import React from "react"
import Button from "Button"

const ButtonRounded = ({ children, ...props }) => (
  <Button
    className="ad-ButtonRounded"
    { ...props }>
    { children }
  </Button>
)

export default ButtonRounded
