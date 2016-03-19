import React from "react"
import Button from "Button"

const ButtonExpand = ({ children, ...props }) => (
  <Button
    className="ad-ButtonExpand"
    { ...props }>
    { children }
  </Button>
)

export default ButtonExpand
