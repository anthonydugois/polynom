import React, { Component, PropTypes } from "react"
import Expand from "Expand"
import ExpandCaption from "Expand/ExpandCaption"
import ExpandPanel from "Expand/ExpandPanel"
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
            test
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
