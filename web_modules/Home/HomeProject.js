import React, { Component, PropTypes } from "react"
import { Link } from "react-router"
import DateTime from "DateTime"
import SVG from "SVG"
import { ButtonSquare } from "Button"
import { MdDelete } from "react-icons/lib/md"

class HomeProject extends Component {
  handleRemoveClick = (e) => {
    this.props.onRemoveProject(this.props.project.id)
  };

  render() {
    const {
      project,
      pathsById,
      pointsById,
    } = this.props

    return (
      <div className="ad-HomeProject">
        <div className="ad-HomeProject-overview">
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
            { project.updatedAt > project.createdAt ? "Updated " : "Created " }
            <DateTime
              datetime={ project.updatedAt > project.createdAt ?
                project.updatedAt :
                project.createdAt }
              format="en-US"
              formatOptions={{
                year: "numeric",
                month: "short",
                day: "numeric",
              }} />
          </div>
          <div className="ad-HomeProject-actions">
            <ButtonSquare
              size="2.5rem"
              type={ ["action", "light"] }
              onClick={ this.handleRemoveClick }>
              <MdDelete size="1rem" />
            </ButtonSquare>
          </div>
        </div>
      </div>
    )
  }
}

HomeProject.propTypes = {
  onRemoveProject: PropTypes.func.isRequired,
  project: PropTypes.object.isRequired,
}

export default HomeProject
