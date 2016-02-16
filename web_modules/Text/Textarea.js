import React from "react"
import "./styles"

const Textarea = (props) => (
  <textarea { ...props } />
)

Textarea.defaultProps = { className: "ad-Textarea" }

export default Textarea
