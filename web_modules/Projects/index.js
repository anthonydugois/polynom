import "./styles"

import React, { Component, PropTypes } from "react"
import { Link } from "react-router"
import DateTime from "DateTime"

class Projects extends Component {
  renderProject = (key) => {
    const project = this.props.projectsById[key]

    return (
      <div
        key={ key }
        className="ad-ProjectItem">
        <div className="ad-ProjectItem-overview">
          <div className="ad-ProjectItem-open">Open</div>
        </div>

        <div className="ad-ProjectItem-content">
          <Link
            className="ad-ProjectItem-name"
            to={ `/projects/${ project.id }` }>
            { project.name }
          </Link>

          <div className="ad-ProjectItem-datetime">
            <DateTime datetime={ project.createdAt } />
          </div>

          <div className="ad-ProjectItem-actions">
            ...
          </div>
        </div>
      </div>
    )
  };

  render() {
    const { projectsById } = this.props

    return (
      <div className="ad-Projects">
        { Object.keys(projectsById).map(this.renderProject) }
      </div>
    )
  }
}

Projects.propTypes = {
  projectsById: PropTypes.object.isRequired,
}

export default Projects
