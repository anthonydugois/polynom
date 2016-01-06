import React, { PropTypes } from "react"

const Point = ({
  x,
  y,
}) => (
  <circle
    className="ad-Point"
    cx={ x }
    cy={ y }
    r={ 8 } />
)

Point.propTypes = {
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
}

export default Point

/*function Point(props) {
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
*/
