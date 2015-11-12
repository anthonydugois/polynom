import React from "react"

function Choices(props) {
  const {
    choices,
    ..._props,
  } = props

  let _choices = choices.map((choice, index) => {
    return (
      <label
        key={ index }
        className="ad-Choice">
        <input
          className="ad-Choice-input"
          type="radio"
          value={ choice.value }
          checked={ choice.checked }
          { ..._props } />

        <div className="ad-Choice-fake">
          { choice.name }
        </div>
      </label>
    )
  })

  return (
    <div className="ad-Choices">
      { _choices }
    </div>
  )
}

export default Choices
