import React from "react"
import "./styles"

const Textarea = ({
  ...props,
}) => (
  <textarea
    className="ad-Textarea"
    { ...props } />
)

export default Textarea
