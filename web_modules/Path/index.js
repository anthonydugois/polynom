import React, { Component, PropTypes } from "react"
import Expand from "Expand"
import ExpandCaption from "Expand/ExpandCaption"
import ExpandPanel from "Expand/ExpandPanel"
import Settings from "Settings"
import Setting from "Settings/Setting"
import Checkbox from "Checkbox"
import "./styles"

class Path extends Component {
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
                <Checkbox />
              </Setting>

              <Setting label="Closed">
                <Checkbox />
              </Setting>

              <Setting label="Filled">
                <Checkbox />
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
}

export default Path
