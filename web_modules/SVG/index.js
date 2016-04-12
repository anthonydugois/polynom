import React, { PropTypes } from "react"
import { pathCode } from "../../src/utils"

const SVG = ({
  project,
  pathsById,
  pointsById,
  ...props,
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={ project.width }
    height={ project.height }
    viewBox={ `0 0 ${ project.width } ${ project.height }` }
    { ...props }>
    { project.paths.map((key) => (
      <path
        key={ key }
        d={ pathCode(pathsById[key], pointsById) } />
    )) }
  </svg>
)

SVG.propTypes = {
  project: PropTypes.object.isRequired,
  pathsById: PropTypes.object.isRequired,
  pointsById: PropTypes.object.isRequired,
}

export default SVG
