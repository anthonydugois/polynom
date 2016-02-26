import "./styles"

import React, { PropTypes } from "react"
import cx from "classnames"
import Icon from "Icon"

const Hint = ({
  icon,
  align,
  title,
  children,
}) => (
  <div className={ cx("ad-Hint", {
    "ad-Hint--row": align === "row",
    "ad-Hint--column": align === "column",
  }) }>
    { icon && (
      <div className="ad-Hint-icon">
        <Icon name={ icon } />
      </div>
    ) }
    <div className="ad-Hint-content">
      <div className="ad-Hint-title">
        { title }
      </div>
      <div className="ad-Hint-message">
        { children }
      </div>
    </div>
  </div>
)

Hint.defaultProps = {
  icon: null,
  align: "row",
}

Hint.propTypes = {
  icon: PropTypes.string,
  align: PropTypes.string,
  title: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.element,
    PropTypes.string,
  ]),
}

export default Hint
