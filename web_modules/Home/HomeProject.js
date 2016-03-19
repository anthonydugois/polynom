import React, { PropTypes } from "react"
import { Link } from "react-router"
import DateTime from "DateTime"

const HomeProject = ({ project }) => (
  <div className="ad-HomeProject">
    <div className="ad-HomeProject-overview">
      <div className="ad-HomeProject-open">Open</div>
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
      <div className="ad-HomeProject-actions">
        ...
      </div>
    </div>
  </div>
)

HomeProject.propTypes = {
  project: PropTypes.object.isRequired,
}

export default HomeProject
