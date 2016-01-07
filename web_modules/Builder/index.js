import React, { Component, PropTypes } from "react"
import Overview from "Overview"
import Sidebar from "Sidebar"
import "./styles"

class Builder extends Component {
  render() {
    return (
      <div className="ad-Builder">
        <Sidebar />
        <Overview />
      </div>
    )
  }
}

Builder.propTypes = {}

export default Builder
