import React, { PropTypes } from "react"
import { Link } from "react-router"
import DateTime from "DateTime"
import SVG from "SVG"

const HomeProject = ({
  project,
  pathsById,
  pointsById,
}) => (
  <div className="ad-HomeProject">
    <div className="ad-HomeProject-overview">
      <div className="ad-HomeProject-open">Open</div>
      <SVG
        className="ad-HomeProject-svg"
        project={ project }
        pathsById={ pathsById }
        pointsById={ pointsById } />
    </div>
    <div className="ad-HomeProject-content">
      <Link
        className="ad-HomeProject-name"
        to={ `/projects/${ project.id }` }>
        { project.name }
      </Link>
      <div className="ad-HomeProject-datetime">
        <DateTime datetime={ project.createdAt } />
      </div>
    </div>
  </div>
)

HomeProject.propTypes = {
  project: PropTypes.object.isRequired,
}

export default HomeProject
