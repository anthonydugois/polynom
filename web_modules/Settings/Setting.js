import React, { PropTypes } from "react"
import "./styles"

const Setting = ({
  label,
  children,
}) => (
  <div className="ad-Setting">
    { label && (
      <label className="ad-Setting-label">
        { label }
      </label>
    ) }
    <div className="ad-Setting-widget">
      { children }
    </div>
  </div>
)

Setting.propTypes = {
  label: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.element,
  ]).isRequired,
}

export default Setting
