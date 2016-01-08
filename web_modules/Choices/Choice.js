import React, { PropTypes } from "react"

const Choice = ({
  children,
  ...props,
}) => (
  <label className="ad-Choice">
    <input
      className="ad-Choice-input"
      type="radio"
      { ...props } />

    <div className="ad-Choice-fake">
      { children }
    </div>
  </label>
)

Choices.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.element,
    PropTypes.string,
  ]),
}

export default Choice
