import "./styles"

import React, { Component, PropTypes } from "react"
import { SidebarPanel, SidebarModule } from "Sidebar"
import Settings, { Setting } from "Settings"
import Range from "Range"
import Checkbox from "Checkbox"
import Choices, { Choice } from "Choices"
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

  render() {
    const { project } = this.props

    return (
      <SidebarPanel>
        <SidebarModule style={{ padding: ".75rem 0" }}>
          <Settings>
            <Setting label="Width">
              <Range
                min={ 0 }
                max={ 10000 }
                value={ project.width }
                onChange={ this.handleWidthChange } />
            </Setting>
          </Settings>

          <Settings>
            <Setting label="Height">
              <Range
                min={ 0 }
                max={ 10000 }
                value={ project.height }
                onChange={ this.handleHeightChange } />
            </Setting>
          </Settings>

          <Settings>
            <Setting label="Grid size">
              <Range
                min={ 1 }
                max={ Math.min(project.width, project.height) }
                value={ project.gridSize }
                onChange={ this.handleGridSizeChange } />
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
