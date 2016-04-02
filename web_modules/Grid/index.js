import "./styles"

import React, { PropTypes } from "react"
import cx from "classnames"

const Grid = ({ zoom, project }) => {
  const verticalLines = []
  const horizontalLines = []

  for (let i = 1 ; i < project.width / project.gridSize ; i++) {
    verticalLines.push(
      <line
        key={ i }
        strokeWidth={ 1 / zoom }
        x1={ i * project.gridSize }
        y1={ 0 }
        x2={ i * project.gridSize }
        y2={ project.height } />
    )
  }

  for (let i = 1 ; i < project.height / project.gridSize ; i++) {
    horizontalLines.push(
      <line
        key={ i }
        strokeWidth={ 1 / zoom }
        x1={ 0 }
        y1={ i * project.gridSize }
        x2={ project.width }
        y2={ i * project.gridSize } />
    )
  }

  return (
    <g className={ cx("ad-Grid", { "is-shown": project.gridShow }) }>
      { verticalLines }
      { horizontalLines }
    </g>
  )
}

Grid.propTypes = {
  zoom: PropTypes.number.isRequired,
  project: PropTypes.object.isRequired,
}

export default Grid
