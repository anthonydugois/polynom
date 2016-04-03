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
    const { project } = this.props

    return (
      <SidebarPanel>
        <SidebarModule style={{ padding: ".75rem 0" }}>
          <Settings>
            <Setting label="Document width">
              <Text
                style={{ width: "4rem" }}
                value={ project.width }
                onChange={ this.handleWidthChange } />
            </Setting>
            <Setting label="Document height">
              <Text
                style={{ width: "4rem" }}
                value={ project.height }
                onChange={ this.handleHeightChange } />
            </Setting>
          </Settings>

          <Settings>
            <Setting label="Show point codes">
              <Choices>
                <Choice
                  value={ VisibilityTypes.ALL }
                  checked={ project.pointCodeShow === VisibilityTypes.ALL }
                  onChange={ this.handlePointCodeShowChange }>
                  All
                </Choice>

                <Choice
                  value={ VisibilityTypes.ACTIVE }
                  checked={ project.pointCodeShow === VisibilityTypes.ACTIVE }
                  onChange={ this.handlePointCodeShowChange }>
                  Active
                </Choice>

                <Choice
                  value={ VisibilityTypes.NONE }
                  checked={ project.pointCodeShow === VisibilityTypes.NONE }
                  onChange={ this.handlePointCodeShowChange }>
                  None
                </Choice>
              </Choices>
            </Setting>
          </Settings>

          <Settings>
            <Setting label="Show grid">
              <Checkbox
                checked={ project.gridShow }
                onChange={ this.handleGridShowChange } />
            </Setting>
            <Setting label="Snap to grid">
              <Checkbox
                checked={ project.gridSnap }
                onChange={ this.handleGridSnapChange } />
            </Setting>
          </Settings>

          <Settings>
            <Setting label="Grid size">
              <Text
                style={{ width: "4rem" }}
                value={ project.gridSize }
                onChange={ this.handleGridSizeChange } />
            </Setting>
          </Settings>

          <Settings>
            <Setting label="Show bounding box">
              <Checkbox
                checked={ project.pathBoundingBoxShow }
                onChange={ this.handlePathBboxShowChange } />
            </Setting>
          </Settings>

          <Settings>
            <Setting label="Keyboard increment">
              <Text
                style={{ width: "4rem" }}
                value={ project.keyboardIncrement }
                onChange={ this.handleKeyboardIncrementChange } />
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
}

export default SidebarSettings
