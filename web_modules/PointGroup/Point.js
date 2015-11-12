import React from "react"

function Point(props) {
  const {
    activePath,
    activePoint,
    x,
    y,
    drag,
  } = props

  return (
    <circle
      className="ad-Point"
      cx={ x }
      cy={ y }
      r={ 8 }
      onMouseDown={ (e) => drag(e, activePath, activePoint) } />
  )
}

export default Point
