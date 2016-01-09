import React, { PropTypes } from "react"

const Settings = ({
  children,
}) => (
  <div className="ad-Settings">
    { children }
  </div>
)

Settings.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.element,
  ]).isRequired,
}

export default Settings
