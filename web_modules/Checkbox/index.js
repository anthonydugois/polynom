import "./styles"

import React from "react"

const Checkbox = (props) => (
  <label className="ad-Checkbox">
    <input
      className="ad-Checkbox-input"
      type="checkbox"
      { ...props } />
    <div className="ad-Checkbox-fake" />
  </label>
)

export default Checkbox
