import React, { Component, PropTypes } from "react"
import Grid from "./Grid"
import Shape from "./Shape"
import "./styles"

function getStyles(props) {
  const {
    width,
    height,
  } = props

  return {
    width,
    height,
  }
}

class Overview extends Component {
  static propTypes = {
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
    grid: PropTypes.object.isRequired,
    paths: PropTypes.array.isRequired,
  }

  renderShape(path) {
    return (
      <Shape
        key={ path.id }
        path={ path } />
    )
  }

  render() {
    const {
      width,
      height,
      grid,
      paths,
    } = this.props

    return (
      <svg
        className="ad-Overview"
        style={ getStyles(this.props) }>
        <Grid
          width={ width }
          height={ height }
          grid={ grid } />

        { paths.map((path) => this.renderShape(path)) }
      </svg>
    )
  }
}

export default Overview
