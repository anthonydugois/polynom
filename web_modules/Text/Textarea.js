import "./styles"

import React from "react"

const Textarea = (props) => (
  <textarea { ...props } />
)

Textarea.defaultProps = { className: "ad-Textarea" }

export default Textarea
