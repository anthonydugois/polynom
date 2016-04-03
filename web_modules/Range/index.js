import "./styles"

import React, { PropTypes } from "react"
import Text from "Text"

const Range = ({
  value,
  onChange,
  ...props,
}) => (
  <div className="ad-Range">
    <input
      className="ad-Range-input"
      type="range"
      value={ value }
      onChange={ onChange }
      { ...props } />
    <Text
      style={{ width: "2rem" }}
      value={ value }
      onChange={ onChange } />
  </div>
)

Range.propTypes = {
  value: PropTypes.number,
  onChange: PropTypes.func,
}

export default Range
