import "./styles"

import React, { PropTypes } from "react"
import { Link } from "react-router"
import Icon from "Icon"
import Container from "Container"
import { ButtonRounded } from "Button"
import Projects from "Projects"

const Home = ({
  projectsById,
}) => (
  <div className="ad-Home">
    <div className="ad-Home-head">
      <Container>
        <Link
          to="/"
          className="ad-Home-brand">
          <Icon name="polynom" />
          <span className="ad-Home-brandname">Polynom</span>
        </Link>
        <div className="ad-Home-lead">
          Create and edit SVG paths easily directly in your browser.
        </div>
      </Container>
    </div>

    <div className="ad-Home-body">
      <Container className="ad-Home-content">
        <ul className="ad-Home-actions">
          <li className="ad-Home-action">
            <ButtonRounded
              size="3rem"
              type="primary">
              New project
            </ButtonRounded>
          </li>
          <li className="ad-Home-action">
            <ButtonRounded size="3rem">
              Import...
            </ButtonRounded>
          </li>
        </ul>
        <div className="ad-Home-projects">
          <Projects projectsById={ projectsById } />
        </div>
      </Container>
    </div>
  </div>
)

Home.propTypes = {
  projectsById: PropTypes.object.isRequired,
}

export default Home
