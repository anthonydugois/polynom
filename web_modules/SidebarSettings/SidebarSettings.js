import "./styles"

import React, { Component, PropTypes } from "react"
import { SidebarPanel, SidebarModule } from "Sidebar"
import Settings, { Setting } from "Settings"
import Checkbox from "Checkbox"
import Choices, { Choice } from "Choices"
import Text from "Text"
import { clamp } from "../../src/utils"
import * as VisibilityTypes from "../../src/constants/VisibilityTypes"

class SidebarSettings extends Component {
  handleWidthChange = (e) => {
    this.props.onWidthChange(clamp(e.target.value, 0, 10000))
  };

  handleHeightChange = (e) => {
    this.props.onHeightChange(clamp(e.target.value, 0, 10000))
  };

  handleGridShowChange = (e) => {
    this.props.onGridShowChange(e.target.checked)
  };

  handleGridSnapChange = (e) => {
    this.props.onGridSnapChange(e.target.checked)
  };

  handleGridSizeChange = (e) => {
    const min = 1
    const max = Math.min(this.props.project.width, this.props.project.height)

    this.props.onGridSizeChange(clamp(e.target.value, min, max))
  };

  handlePointCodeShowChange = (e) => {
    this.props.onPointCodeShowChange(e.target.value)
  };

  handlePathBboxShowChange = (e) => {
    this.props.onPathBboxShowChange(e.target.checked)
  };

  handleKeyboardIncrementChange = (e) => {
    const min = 1
    const max = Math.min(this.props.project.width, this.props.project.height)

    this.props.onKeyboardIncrementChange(clamp(e.target.value, min, max))
  };

  render() {
    const { project, settings } = this.props

    return (
      <SidebarPanel>
        <SidebarModule style={{ padding: ".75rem 0" }}>
          <Settings title="Document size">
            <Setting label="Width">
              <Text
                style={{ width: "4rem" }}
                value={ project.width }
                onChange={ this.handleWidthChange } />
            </Setting>
            <Setting label="Height">
              <Text
                style={{ width: "4rem" }}
                value={ project.height }
                onChange={ this.handleHeightChange } />
            </Setting>
          </Settings>

          <Settings title="Grid options">
            <Setting label="Grid size">
              <Text
                style={{ width: "4rem" }}
                value={ settings.gridSize }
                onChange={ this.handleGridSizeChange } />
            </Setting>
            <Setting label="Show grid">
              <Checkbox
                checked={ settings.gridShow }
                onChange={ this.handleGridShowChange } />
            </Setting>
            <Setting label="Snap to grid">
              <Checkbox
                checked={ settings.gridSnap }
                onChange={ this.handleGridSnapChange } />
            </Setting>
          </Settings>

          <Settings title="Keyboard">
            <Setting label="Increment">
              <Text
                style={{ width: "4rem" }}
                value={ settings.keyboardIncrement }
                onChange={ this.handleKeyboardIncrementChange } />
            </Setting>
          </Settings>

          <Settings title="Helpers">
            <Setting label="Show box">
              <Checkbox
                checked={ settings.pathBoundingBoxShow }
                onChange={ this.handlePathBboxShowChange } />
            </Setting>
            <Setting label="Point codes">
              <Choices>
                <Choice
                  value={ VisibilityTypes.ALL }
                  checked={ settings.pointCodeShow === VisibilityTypes.ALL }
                  onChange={ this.handlePointCodeShowChange }>
                  All
                </Choice>
                <Choice
                  value={ VisibilityTypes.ACTIVE }
                  checked={ settings.pointCodeShow === VisibilityTypes.ACTIVE }
                  onChange={ this.handlePointCodeShowChange }>
                  Active
                </Choice>
                <Choice
                  value={ VisibilityTypes.NONE }
                  checked={ settings.pointCodeShow === VisibilityTypes.NONE }
                  onChange={ this.handlePointCodeShowChange }>
                  None
                </Choice>
              </Choices>
            </Setting>
          </Settings>
        </SidebarModule>
      </SidebarPanel>
    )
  }
}

SidebarSettings.propTypes = {
  onWidthChange: PropTypes.func.isRequired,
  onHeightChange: PropTypes.func.isRequired,
  onGridShowChange: PropTypes.func.isRequired,
  onGridSnapChange: PropTypes.func.isRequired,
  onGridSizeChange: PropTypes.func.isRequired,
  onPointCodeShowChange: PropTypes.func.isRequired,
  onPathBboxShowChange: PropTypes.func.isRequired,
  onKeyboardIncrementChange: PropTypes.func.isRequired,
  project: PropTypes.object.isRequired,
  settings: PropTypes.object.isRequired,
}

export default SidebarSettings
