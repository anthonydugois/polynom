import React, { Component, PropTypes } from "react"
import { connect } from "react-redux"
import "./styles"

class Sidebar extends Component {
  render() {
    return (
      <div className="ad-Sidebar">
      </div>
    )
  }
}

Sidebar.propTypes = {}

export default connect((state) => state)(Sidebar)
