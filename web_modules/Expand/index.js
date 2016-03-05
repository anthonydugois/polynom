import "./styles.css"

import React, { Component, PropTypes } from "react"

class Expand extends Component {
  state = { _isOpened: this.props.isOpened };

  componentDidMount() {
    document.addEventListener("click", this.close, true)
  }

  componentWillUnmount() {
    document.removeEventListener("click", this.close, true)
  }

  close = (e) => {
    if (this.props.documentPropagation && this.state._isOpened) {
      e.stopPropagation()
      this.setState({ _isOpened: false })
    }
  };

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
      if (child.type.name === "ExpandCaption") {
        const _onClick = this.handleClick(!_isOpened)

        return React.cloneElement(child, {
          _onClick,
          _isOpened,
          ...child.props,
        })
      }

      if (child.type.name === "ExpandPanel") {
        return React.cloneElement(child, { _isOpened })
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

Expand.defaultProps = {
  isOpened: false,
  documentPropagation: false,
}

Expand.propTypes = {
  isOpened: PropTypes.bool,
  documentPropagation: PropTypes.bool,
  children: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.element,
  ]),
}

export ExpandCaption from "./ExpandCaption"
export ExpandPanel from "./ExpandPanel"
export default Expand
