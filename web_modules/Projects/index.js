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
        className="ad-Projects-item">
        <Link to={ `/projects/${ project.id }` }>
          { project.name }
          <DateTime datetime={ project.createdAt } />
        </Link>
      </div>
    )
  };

  render() {
    const { projectsById } = this.props

    return (
      <div className="ad-Projects">
        <div className="ad-Projects-list">
          { Object.keys(projectsById).map(this.renderProject) }
        </div>
      </div>
    )
  }
}

Projects.propTypes = {
  projectsById: PropTypes.object.isRequired,
}

export default Projects
