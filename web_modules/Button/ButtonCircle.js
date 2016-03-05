import React, { PropTypes } from "react"
import Button from "Button"

function getStyles(size, style) {
  return {
    width: size,
    height: size,
    ...style,
  }
}

const ButtonCircle = ({
  size,
  style,
  children,
  ...props,
}) => (
  <Button
    className={ ["ad-ButtonCircle"] }
    style={ getStyles(size, style) }
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
