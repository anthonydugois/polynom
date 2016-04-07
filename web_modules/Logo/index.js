import "./styles"

import React from "react"

const Logo = ({ size }) => (
  <svg
    className="ad-Logo"
    height={ size }
    viewBox="0 0 64 128">
    <polygon points="64 0 64 64 16 64 64 0" />
    <polygon points="10 67 48.25 16 0 16 0 128 34.857 67 10 67" />
  </svg>
)

Logo.defaultProps = { size: "1rem" }

export default Logo
