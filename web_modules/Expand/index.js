import React, { Component, PropTypes } from "react"
import "./styles.css"

class Expand extends Component {
  state = { isOpened: this.props.isOpened };

  handleClick(isOpened) {
    return () => this.setState({ isOpened })
  }

  renderChildren(children) {
    const { isOpened } = this.state

    return React.Children.map(children, (child) => {
      if (child.type.name === "ExpandCaption") {
        const onClick = this.handleClick(!isOpened)

        return React.cloneElement(child, {
          isOpened,
          onClick,
        })
      }

      if (child.type.name === "ExpandPanel") {
        return React.cloneElement(child, { isOpened })
      }

      return child
    })
  }

  render() {
    return (
      <div className="ad-Expand">
        { this.renderChildren(this.props.children) }
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

export default Expand
