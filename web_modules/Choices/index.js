import "./styles"

import React, { PropTypes } from "react"

const Choices = ({ children }) => (
  <div className="ad-Choices">
    { children }
  </div>
)

Choices.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.element,
  ]),
}

export Choice from "./Choice"

export default Choices
