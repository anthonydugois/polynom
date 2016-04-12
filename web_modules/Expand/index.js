import "./styles.css"

import React, { Component, PropTypes } from "react"

class Expand extends Component {
  state = { _isOpened: this.props.isOpened };

  handleClick(_isOpened) {
    return (e) => {
      e.preventDefault()
      e.stopPropagation()

      this.setState({ _isOpened })
    }
  }

  renderChildren(children) {
    const { _isOpened } = this.state

    return React.Children.map(children, (child) => {
      if (child.props.isExpandHandler) {
        const _onExpandClick = this.handleClick(!_isOpened)

        return React.cloneElement(child, {
          ...child.props,
          _onExpandClick,
          _isOpened,
        })
      }

      if (child.type.displayName === "ExpandPanel") {
        return React.cloneElement(child, {
          ...child.props,
          _isOpened,
        })
      }

      return child
    })
  }

  render() {
    const { children, ...props } = this.props

    return (
      <div { ...props }>
        { this.renderChildren(children) }
      </div>
    )
  }
}

Expand.defaultProps = { isOpened: false }

Expand.propTypes = {
  isOpened: PropTypes.bool,
  children: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.element,
  ]),
}

export ExpandPanel from "./ExpandPanel"

export default Expand
