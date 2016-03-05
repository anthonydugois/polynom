import React, { PropTypes } from "react"
import Button from "./Button"

function getStyles(props) {
  const { size } = props

  return {
    width: size,
    height: size,
  }
}

const ButtonCircle = ({
  children,
  ...props,
}) => (
  <Button
    className={ ["ad-ButtonCircle"] }
    style={ getStyles(props) }
    { ...props }>
    { children }
  </Button>
)

ButtonCircle.propTypes = {
  size: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  children: PropTypes.any,
}

export default ButtonCircle
