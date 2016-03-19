import React from "react"
import Button from "Button"

const ButtonTab = ({ children, ...props }) => (
  <Button
    className="ad-ButtonTab"
    { ...props }>
    { children }
  </Button>
)

export default ButtonTab
