import React, { PropTypes } from "react"
import Button from "Button"

const ButtonExpand = ({
  children,
  ...props,
}) => (
  <Button
    className={ ["ad-ButtonExpand"] }
    { ...props }>
    { children }
  </Button>
)

ButtonExpand.propTypes = {
  children: PropTypes.any,
}

export default ButtonExpand
