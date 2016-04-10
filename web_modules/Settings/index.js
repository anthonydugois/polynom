import "./styles"

import React, { PropTypes } from "react"

const Settings = ({ title, children }) => (
  <div className="ad-Settings">
    { title && (
      <h4 className="ad-Settings-title">
        { title }
      </h4>
    ) }
    { children }
  </div>
)

Settings.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.element,
  ]).isRequired,
}

export Setting from "./Setting"
export default Settings
