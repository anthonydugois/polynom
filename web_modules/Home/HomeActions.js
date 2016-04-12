import React, { Component } from "react"

class HomeActions extends Component {
  render() {
    const { children, ...props } = this.props

    return (
      <ul
        className="ad-HomeActions"
        { ...props }>
        { children }
      </ul>
    )
  }
}

export default HomeActions
