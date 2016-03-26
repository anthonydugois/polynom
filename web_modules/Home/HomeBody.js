import React, { PropTypes } from "react"
import Container from "Container"
import { ButtonRounded } from "Button"
import HomeActions from "./HomeActions"
import HomeAction from "./HomeAction"
import HomeProjects from "./HomeProjects"

const HomeBody = ({
  projectsById,
  pathsById,
  pointsById,
}) => (
  <div className="ad-HomeBody">
    <Container className="ad-HomeBody-container">
      <HomeActions>
        <HomeAction>
          <ButtonRounded
            size="3rem"
            type="primary">
            New project
          </ButtonRounded>
        </HomeAction>
        <HomeAction>
          <ButtonRounded size="3rem">
            Import...
          </ButtonRounded>
        </HomeAction>
      </HomeActions>

      <HomeProjects
        projectsById={ projectsById }
        pathsById={ pathsById }
        pointsById={ pointsById } />
    </Container>
  </div>
)

HomeBody.propTypes = {
  projectsById: PropTypes.object.isRequired,
}

export default HomeBody
