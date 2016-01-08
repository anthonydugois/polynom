import React, { Component, PropTypes } from "react"
import { connect } from "react-redux"
import Grid from "Grid"
import Shape from "Shape"
import "./styles"

function getStyles(props) {
  const {
    width,
    height,
  } = props.builder

  return {
    width,
    height,
  }
}

class Overview extends Component {
  renderShape(path) {
    return (
      <Shape
        key={ path.id }
        path={ path } />
    )
  }

  render() {
    const {
      builder,
      paths,
    } = this.props

    return (
      <svg
        className="ad-Overview"
        style={ getStyles(this.props) }>
        <Grid
          width={ builder.width }
          height={ builder.height }
          grid={ builder.grid } />

        { paths.map((path) => this.renderShape(path)) }
      </svg>
    )
  }
}

Overview.propTypes = {
  dispatch: PropTypes.func.isRequired,
  builder: PropTypes.object.isRequired,
  paths: PropTypes.array.isRequired,
}

export default connect((state) => state)(Overview)
