import React, { Component, PropTypes } from "react"
import { findDOMNode } from "react-dom"
import Container from "Container"
import { ButtonRounded } from "Button"
import Hint from "Hint"
import HomeActions from "./HomeActions"
import HomeAction from "./HomeAction"
import HomeProjects from "./HomeProjects"
import { MdDashboard } from "react-icons/lib/md"

class HomeBody extends Component {
  state = { actionsFixed: false };

  componentDidMount() {
    this.boundingRect = findDOMNode(this.actions).getBoundingClientRect()
    document.addEventListener("scroll", this.handleScroll)
  }

  handleScroll = () => {
    if (document.body.scrollTop >= this.boundingRect.top) {
      if (!this.state.actionsFixed) {
        this.setState({ actionsFixed: true })
      }
    } else {
      if (this.state.actionsFixed) {
        this.setState({ actionsFixed: false })
      }
    }
  };

  handleCreateProject = (e) => {
    e.preventDefault()

    this.props.onCreateProject("Untitled", 1200, 800)
  };

  render() {
    const {
      projectsById,
      pathsById,
      pointsById,
    } = this.props

    return (
      <div className="ad-HomeBody">
        <Container className="ad-HomeBody-container">
          <div className="ad-HomeBody-actions">
            <HomeActions
              ref={ (actions) => this.actions = actions }
              style={ this.state.actionsFixed ? {
                position: "fixed",
                top: 0,
                bottom: 0,
              } : {}}>
              <HomeAction>
                <ButtonRounded
                  size="3rem"
                  type="primary"
                  onClick={ this.handleCreateProject }>
                  New project
                </ButtonRounded>
              </HomeAction>
              <HomeAction>
                <ButtonRounded size="3rem">
                  Import...
                </ButtonRounded>
              </HomeAction>
            </HomeActions>
          </div>

          <div className="ad-HomeBody-projects">
            { Object.keys(projectsById).length > 0 ? (
              <HomeProjects
                onRemoveProject={ this.props.onRemoveProject }
                projectsById={ projectsById }
                pathsById={ pathsById }
                pointsById={ pointsById } />
            ) : (
              <div style={{ padding: ".5rem" }}>
                <Hint
                  align="column"
                  icon={ <MdDashboard size="2rem" /> }
                  title="No project">
                  You don't have any project yet. Create the first one!
                </Hint>
              </div>
            ) }
          </div>
        </Container>
      </div>
    )
  }
}

HomeBody.propTypes = {
  onCreateProject: PropTypes.func.isRequired,
  onRemoveProject: PropTypes.func.isRequired,
  projectsById: PropTypes.object.isRequired,
}

export default HomeBody
