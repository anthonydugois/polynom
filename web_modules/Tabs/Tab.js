import React from "react"
import cx from "classnames"

function Tab(props) {
  const {
    active,
    children,
  } = props

  return (
    <div className={ cx("ad-Tab", { "is-active": active }) }>
      { children }
    </div>
  )
}

export default Tab
