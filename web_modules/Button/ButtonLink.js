import React from "react"
import cx from "classnames"

import Icon from "Icon"

function ButtonLink(props) {
  let {
    action,
    icon,
    value,
    ..._props,
  } = props

  return (
    <a
      className={ cx("ad-Button", `ad-Button--${ action ? action : "default" }`) }
      { ..._props }>
      { icon && (<Icon name={ icon } />) }
      { value && (
        <span className="ad-Button-text">
          { value }
        </span>
      ) }
    </a>
  )
}

export default ButtonLink
