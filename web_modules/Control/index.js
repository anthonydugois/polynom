import React from "react"

import Range from "./Range"
import Text from "./Text"
import Textarea from "./Textarea"
import Checkbox from "./Checkbox"
import Choices from "./Choices"

import "./styles"

function Control(props) {
  const {
    label,
    type,
    ..._props,
  } = props

  let control, _label

  switch (type) {
    case "range":
      control = <Range { ..._props } />
      break

    case "text":
      control = <Text { ..._props } />
      break

    case "textarea":
      control = <Textarea { ..._props } />
      break

    case "checkbox":
      control = <Checkbox { ..._props } />
      break

    case "choices":
      control = <Choices { ..._props } />
      break

    default:
      control = ""
      break
  }

  if (label) {
    _label = (
      <label className="ad-Control-label">
        { label }
      </label>
    )
  }

  return (
    <div className="ad-Control">
      { _label }
      { control }
    </div>
  )
}

export default Control
