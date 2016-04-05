import "./styles"

import React, { PropTypes } from "react"

const Grid = ({ zoom, project, settings }) => {
  const verticalLines = []
  const horizontalLines = []
  const strokeWidth = 1 / zoom

  for (let i = 1 ; i < project.width / settings.gridSize ; i++) {
    verticalLines.push(
      <line
        key={ i }
        strokeWidth={ strokeWidth }
        x1={ i * settings.gridSize }
        y1={ 0 }
        x2={ i * settings.gridSize }
        y2={ project.height } />
    )
  }

  for (let i = 1 ; i < project.height / settings.gridSize ; i++) {
    horizontalLines.push(
      <line
        key={ i }
        strokeWidth={ strokeWidth }
        x1={ 0 }
        y1={ i * settings.gridSize }
        x2={ project.width }
        y2={ i * settings.gridSize } />
    )
  }

  return (
    <g className="ad-Grid">
      { verticalLines }
      { horizontalLines }
    </g>
  )
}

Grid.propTypes = {
  zoom: PropTypes.number.isRequired,
  project: PropTypes.object.isRequired,
  settings: PropTypes.object.isRequired,
}

export default Grid
