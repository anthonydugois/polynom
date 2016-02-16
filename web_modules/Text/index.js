import React from "react"
import "./styles"

const Text = (props) => (
  <input
    type="text"
    { ...props } />
)

Text.defaultProps = { className: "ad-Text" }

export default Text
