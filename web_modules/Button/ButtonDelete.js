import React, { PropTypes } from "react"
import Button from "./Button"

const ButtonDelete = ({
  children,
  ...props,
}) => (
  <Button
    className={ ["ad-ButtonDelete"] }
    { ...props }>
    { children }
  </Button>
)

ButtonDelete.propTypes = {
  children: PropTypes.any,
}

export default ButtonDelete
