import React, { PropTypes } from "react"
import Button from "Button"

const ButtonTab = ({
  children,
  ...props,
}) => (
  <Button
    className={ ["ad-ButtonTab"] }
    { ...props }>
    { children }
  </Button>
)

ButtonTab.propTypes = {
  children: PropTypes.any,
}

export default ButtonTab
