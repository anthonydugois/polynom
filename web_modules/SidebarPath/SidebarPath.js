import React, { Component, PropTypes } from "react"
import cx from "classnames"
import Expand from "Expand"
import ExpandCaption from "Expand/ExpandCaption"
import ExpandPanel from "Expand/ExpandPanel"
import Settings from "Settings"
import Setting from "Settings/Setting"
import Checkbox from "Checkbox"
import { APP_CTRL } from "../../src/constants/KeyActionTypes"
import "./styles"

class SidebarPath extends Component {
  handlePathClick = () => {
    if (this.props.keyActions.includes(APP_CTRL)) {
      this.props.onPathAddActive()
    } else {
      this.props.onPathActive()
    }
  };

  handleNameChange = (e) => {
    const value = e.target.value

    if (value.trim() !== "") {
      this.props.onNameChange(value)
    }
  };

  handleRelativeChange = (e) => {
    this.props.onRelativeChange(e.target.checked)
  };

  handleClosedChange = (e) => {
    this.props.onClosedChange(e.target.checked)
  };

  handleFilledChange = (e) => {
    this.props.onFilledChange(e.target.checked)
  };

  render() {
    const { path } = this.props

    return (
      <div className={ cx("ad-SidebarPath", { "is-active": path.isActive }) }>
        <Expand>
          <ExpandCaption onClick={ this.handlePathClick }>
            <div className="ad-SidebarPath-name">
              <input
                type="text"
                className="ad-SidebarPath-input"
                value={ path.name }
                onChange={ this.handleNameChange } />
            </div>

            <div className="ad-SidebarPath-actions">
              { /* add some actions here */ }
            </div>
          </ExpandCaption>

          <ExpandPanel>
            <Settings>
              <Setting label="Relative">
                <Checkbox
                  checked={ path.isRelative }
                  onChange={ this.handleRelativeChange } />
              </Setting>

              <Setting label="Closed">
                <Checkbox
                  checked={ path.isClosed }
                  onChange={ this.handleClosedChange } />
              </Setting>

              <Setting label="Filled">
                <Checkbox
                  checked={ path.isFilled }
                  onChange={ this.handleFilledChange } />
              </Setting>
            </Settings>
          </ExpandPanel>
        </Expand>
      </div>
    )
  }
}

SidebarPath.propTypes = {
  onPathAddActive: PropTypes.func.isRequired,
  onPathActive: PropTypes.func.isRequired,
  onNameChange: PropTypes.func.isRequired,
  onRelativeChange: PropTypes.func.isRequired,
  onClosedChange: PropTypes.func.isRequired,
  onFilledChange: PropTypes.func.isRequired,
  keyActions: PropTypes.array.isRequired,
  path: PropTypes.object.isRequired,
}

export default SidebarPath
