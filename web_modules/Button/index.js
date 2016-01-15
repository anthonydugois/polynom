import React, { PropTypes } from "react"
import cx from "classnames"
import Icon from "Icon"
import "./styles"

const Button = ({
  type,
  icon,
  children,
  ...props,
}) => (
  <button
    type="button"
    className={ cx("ad-Button", { [`ad-Button--${ type }`]: type }) }
    { ...props }>
    <div className="ad-Button-content">
      { icon && (<Icon name={ icon } />) }
      { children && (
        <span className="ad-Button-text">
          { children }
        </span>
      ) }
    </div>
  </button>
)

Button.propTypes = {
  type: PropTypes.string,
  icon: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.element,
    PropTypes.string,
  ]),
}

export default Button
