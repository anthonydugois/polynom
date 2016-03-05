import "./styles"

import React, { Component, PropTypes } from "react"
import Text from "Text"
import ButtonCircle from "Button/ButtonCircle"

class SidebarSettings extends Component {
  handleNameChange = (e) => {
    const { value } = e.target

    if (value.trim() !== "") {
      this.props.onNameChange(value)
    }
  };

  render() {
    const { project } = this.props

    return (
      <div className="ad-SidebarSettings">
        <Text
          className="ad-SidebarSettings-input"
          value={ project.name }
          onChange={ this.handleNameChange } />

        <ButtonCircle size="3rem">
          Save
        </ButtonCircle>
      </div>
    )
  }
}

SidebarSettings.propTypes = {
  onNameChange: PropTypes.func.isRequired,
  project: PropTypes.object.isRequired,
}

export default SidebarSettings
