import React, { Component, PropTypes } from "react"
import { renderToStaticMarkup } from "react-dom/server"
import { Link } from "react-router"
import DateTime from "DateTime"
import SVG from "SVG"
import { ButtonSquare } from "Button"
import { MdFileDownload, MdDelete } from "react-icons/lib/md"
import { pathCode, slug } from "../../src/utils"

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

    const createdAt = new Date(project.createdAt)
    const updatedAt = new Date(project.updatedAt)

    // React ignore `xmlns` attribute, which is necessary to open SVG as image
    // if you have a better solution, please replace this ugly code
    const markup = renderToStaticMarkup(
      <SVG
        project={ project }
        pathsById={ pathsById }
        pointsById={ pointsById } />
    ).replace(/^<svg/g, `<svg xmlns="http://www.w3.org/2000/svg"`)
    const file = encodeURIComponent(markup)

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
            { updatedAt > createdAt ? "Updated " : "Created " }
            <DateTime
              datetime={ updatedAt > createdAt ? updatedAt : createdAt }
              format="en-US"
              formatOptions={{
                year: "numeric",
                month: "short",
                day: "numeric",
              }} />
          </div>
          <div className="ad-HomeProject-actions">
            <ButtonSquare
              size="2rem"
              type={ ["action", "light"] }
              href={ `data:image/svg+xml,${ file }` }
              download={ `${ slug(project.name) }.svg` }>
              <MdFileDownload size=".8rem" />
            </ButtonSquare>
            <ButtonSquare
              size="2rem"
              type={ ["action", "light"] }
              onClick={ this.handleRemoveClick }>
              <MdDelete size=".8rem" />
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
  pathsById: PropTypes.object.isRequired,
  pointsById: PropTypes.object.isRequired,
}

export default HomeProject
