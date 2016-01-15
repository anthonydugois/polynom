import React, { Component, PropTypes } from "react"
import cx from "classnames"
import Button from "Button"
import Expand from "Expand"
import ExpandCaption from "Expand/ExpandCaption"
import ExpandPanel from "Expand/ExpandPanel"
import Settings from "Settings"
import Setting from "Settings/Setting"
import Checkbox from "Checkbox"

class SidebarPath extends Component {
  handlePathClick = () => {
    this.props.onPathClick(this.props.path.id)
  };

  handleRemoveClick = (e) => {
    e.stopPropagation()
    this.props.onRemoveClick(this.props.path.id)
  };

  handleNameChange = (e) => {
    const value = e.target.value

    if (value.trim() !== "") {
      this.props.onNameChange(this.props.path.id, value)
    }
  };

  handleRelativeChange = (e) => {
    this.props.onRelativeChange(this.props.path.id, e.target.checked)
  };

  handleClosedChange = (e) => {
    this.props.onClosedChange(this.props.path.id, e.target.checked)
  };

  handleFilledChange = (e) => {
    this.props.onFilledChange(this.props.path.id, e.target.checked)
  };

  render() {
    const { path } = this.props

    return (
      <div
        className={ cx("ad-SidebarPath", { "is-active": path.isActive }) }
        onClick={ this.handlePathClick }>
        <Expand>
          <ExpandCaption>
            <div className="ad-SidebarPath-name">
              <input
                type="text"
                className="ad-SidebarPath-input"
                value={ path.name }
                onChange={ this.handleNameChange } />
            </div>

            <div className="ad-SidebarPath-actions">
              { this.props.showRemoveButton && (
                <Button
                  type="expand"
                  icon="close"
                  onClick={ this.handleRemoveClick } />
              ) }
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
  onPathClick: PropTypes.func.isRequired,
  onRemoveClick: PropTypes.func.isRequired,
  onNameChange: PropTypes.func.isRequired,
  onRelativeChange: PropTypes.func.isRequired,
  onClosedChange: PropTypes.func.isRequired,
  onFilledChange: PropTypes.func.isRequired,
  path: PropTypes.object.isRequired,
  showRemoveButton: PropTypes.bool.isRequired,
}

export default SidebarPath
