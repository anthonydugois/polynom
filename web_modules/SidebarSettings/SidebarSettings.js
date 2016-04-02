import "./styles"

import React, { Component, PropTypes } from "react"
import { SidebarPanel, SidebarModule } from "Sidebar"
import Settings, { Setting } from "Settings"
import Range from "Range"
import Checkbox from "Checkbox"
import { clamp } from "../../src/utils"

class SidebarSettings extends Component {
  handleWidthChange = (e) => {
    this.props.onWidthChange(clamp(e.target.value, 0, 10000))
  };

  handleHeightChange = (e) => {
    this.props.onHeightChange(clamp(e.target.value, 0, 10000))
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
        </SidebarModule>
      </SidebarPanel>
    )
  }
}

SidebarSettings.propTypes = {
  onWidthChange: PropTypes.func.isRequired,
  onHeightChange: PropTypes.func.isRequired,
  project: PropTypes.object.isRequired,
}

export default SidebarSettings
