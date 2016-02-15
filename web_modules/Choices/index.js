import React, { PropTypes } from "react"
import "./styles"

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

export default Choices
