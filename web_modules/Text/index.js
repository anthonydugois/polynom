import "./styles"

import React from "react"

const Text = (props) => (
  <input
    type="text"
    { ...props } />
)

Text.defaultProps = { className: "ad-Text" }

export Textarea from "./Textarea"
export default Text
