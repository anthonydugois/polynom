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
      className="ad-Text  ad-Text--range"
      value={ value }
      onChange={ onChange } />
  </div>
)

Range.propTypes = {
  value: PropTypes.number,
  onChange: PropTypes.func,
}

export default Range
