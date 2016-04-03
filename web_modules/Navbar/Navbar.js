import "./styles"

import React, { Component, PropTypes } from "react"
import { Link } from "react-router"
import Logo from "Logo"
import Text from "Text"

class Navbar extends Component {
  handleProjectNameChange = (e) => {
    const { value } = e.target

    if (value.trim() !== "") {
      this.props.onProjectNameChange(value)
    }
  };

  render() {
    const { project } = this.props

    return (
      <nav className="ad-Navbar">
        <Link
          className="ad-Navbar-logo"
          to="/">
          <Logo size="2rem" />
        </Link>
        <Text
          className="ad-Navbar-projectName"
          value={ project.name }
          onChange={ this.handleProjectNameChange } />
      </nav>
    )
  }
}

Navbar.propTypes = {
  onProjectNameChange: PropTypes.func.isRequired,
  project: PropTypes.object.isRequired,
}

export default Navbar
