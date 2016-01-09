import React, { Component, PropTypes } from "react"
import Expand from "Expand"
import ExpandCaption from "Expand/ExpandCaption"
import ExpandPanel from "Expand/ExpandPanel"
import Settings from "Settings"
import Setting from "Settings/Setting"
import Checkbox from "Checkbox"
import "./styles"

class Path extends Component {
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
    const {
      path,
    } = this.props

    return (
      <div className="ad-Path">
        <Expand>
          <ExpandCaption>
            <div className="ad-Path-name">
              { path.name }
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

Path.propTypes = {
  path: PropTypes.object.isRequired,
  onRelativeChange: PropTypes.func.isRequired,
  onClosedChange: PropTypes.func.isRequired,
  onFilledChange: PropTypes.func.isRequired,
}

export default Path
