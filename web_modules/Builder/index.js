import React, { Component, PropTypes } from "react"
import { connect } from "react-redux"
import Overview from "Overview"
import "./styles"

class Builder extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    builder: PropTypes.object.isRequired,
    paths: PropTypes.array.isRequired,
  }

  render() {
    const {
      builder,
      paths,
    } = this.props

    return (
      <div className="ad-Builder">
        <Overview
          width={ builder.width }
          height={ builder.height }
          grid={ builder.grid }
          paths={ paths } />
      </div>
    )
  }
}

export default connect((state) => state)(Builder)
