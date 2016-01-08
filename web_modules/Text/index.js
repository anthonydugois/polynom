import React from "react"
import "./styles"

const Text = ({
  ...props,
}) => (
  <input
    type="text"
    className="ad-Text"
    { ...props } />
)

export default Text
