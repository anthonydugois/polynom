import React, { PropTypes } from "react"
import Button from "./Button"

const ButtonPrimary = ({
  children,
  ...props,
}) => (
  <Button
    className={ ["ad-ButtonPrimary"] }
    { ...props }>
    { children }
  </Button>
)

ButtonPrimary.propTypes = {
  children: PropTypes.any,
}

export default ButtonPrimary
