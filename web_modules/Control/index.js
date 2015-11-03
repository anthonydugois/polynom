import React from "react"

import Range from "./Range"
import Text from "./Text"
import Textarea from "./Textarea"
import Checkbox from "./Checkbox"
import Button from "./Button"
import Choices from "./Choices"

import "./styles"

function Control(props) {
    const {
        name,
        type,
        ..._props,
    } = props

    let control, label

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

        case "button":
            control = <Button { ..._props } />
        break

        case "choices":
            control = <Choices { ..._props } />
        break

        default:
            control = ""
        break
    }

    if (name) {
        label = (
            <label className="ad-Control-label">
                { name }
            </label>
        )
    }

    return (
        <div className="ad-Control">
            { label }
            { control }
        </div>
    )
}

export default Control
