import React, { PropTypes } from "react"
import cx from "classnames"

const Grid = ({
  width,
  height,
  grid,
}) => {
  const verticalLines = []
  const horizontalLines = []

  for (let i = 1 ; i < width / grid.size ; i++) {
    verticalLines.push(
      <line
        key={ i }
        x1={ i * grid.size }
        y1={ 0 }
        x2={ i * grid.size }
        y2={ height } />
    )
  }

  for (let i = 1 ; i < height / grid.size ; i++) {
    horizontalLines.push(
      <line
        key={ i }
        x1={ 0 }
        y1={ i * grid.size }
        x2={ width }
        y2={ i * grid.size } />
    )
  }

  return (
    <g className={ cx("ad-Grid", { "is-shown": grid.isShown }) }>
      { verticalLines }
      { horizontalLines }
    </g>
  )
}

Grid.propTypes = {
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  grid: PropTypes.shape({
    isShown: PropTypes.bool.isRequired,
    snapToGrid: PropTypes.bool.isRequired,
    size: PropTypes.number.isRequired,
  }).isRequired,
}

export default Grid
