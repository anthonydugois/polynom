import React, { Component } from "react"
import cx from "classnames"

import Control from "Control"
import Icon from "Icon"

import getPath from "../../src/utils/path"

class Path extends Component {
  static propTypes = {
    index: React.PropTypes.number.isRequired,
    initialExpanded: React.PropTypes.bool.isRequired,
    path: React.PropTypes.object.isRequired,
    nbPaths: React.PropTypes.number.isRequired,
    activePath: React.PropTypes.number.isRequired,
    setActivePath: React.PropTypes.func.isRequired,
    setPath: React.PropTypes.func.isRequired,
    removePath: React.PropTypes.func.isRequired,
    setRelative: React.PropTypes.func.isRequired,
    setClosed: React.PropTypes.func.isRequired,
    setFilled: React.PropTypes.func.isRequired,
  }

  state = {
    expanded: this.props.initialExpanded,
    shouldEditPath: false,
    customPath: false,
  }

  handleClick = (e) => {
    e.preventDefault()
    e.stopPropagation()

    const expanded = ! this.state.expanded

    this.setState({ expanded })
  }

  handleFocus = (e) => {
    const {
      points,
      closed,
      relative,
    } = this.props.path

    this.setState({
      shouldEditPath: true,
      customPath: getPath(points, closed, relative),
    })
  }

  handleChange = (e) => {
    this.setState({ customPath: e.target.value })
  }

  handleBlur = (e) => {
    this.props.setPath(this.props.index, this.state.customPath)

    this.setState({ shouldEditPath: false })
  }

  render() {
    const {
      index,
      path,
      nbPaths,
      activePath,
      setActivePath,
      removePath,
      setRelative,
      setClosed,
      setFilled,
    } = this.props

    const {
      expanded,
      shouldEditPath,
      customPath,
    } = this.state

    return (
      <div className={ cx("ad-Expand", {
        "is-active": index === activePath,
        "is-expanded": expanded,
      }) }>
        <div
          className="ad-Expand-head"
          onClick={ (e) => setActivePath(e, index) }>
          <button
            className="ad-Expand-button"
            onClick={ this.handleClick }>
            <Icon name={ expanded ? "down" : "right" } />
          </button>

          <h4 className="ad-Expand-title">
            Path { index + 1 }
          </h4>

          <div className="ad-Expand-actions">
            { nbPaths !== 1 && (
              <button
                className="ad-Expand-button"
                onClick={ (e) => removePath(e, index) }>
                <Icon name="close" />
              </button>
            ) }
          </div>
        </div>

        <div className="ad-Expand-content">
          <div className="ad-Settings">
            <div className="ad-Setting">
              <Control
                type="textarea"
                value={ shouldEditPath ? customPath : getPath(path.points, path.closed, path.relative) }
                onChange={ this.handleChange }
                onFocus={ this.handleFocus }
                onBlur={ this.handleBlur } />
            </div>

            <div className="ad-Setting">
              <Control
                label="Relative"
                type="checkbox"
                checked={ path.relative }
                onChange={ (e) => setRelative(e, index) } />

              <Control
                label="Closed"
                type="checkbox"
                checked={ path.closed }
                onChange={ (e) => setClosed(e, index) } />

              <Control
                label="Filled"
                type="checkbox"
                checked={ path.filled }
                onChange={ (e) => setFilled(e, index) } />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Path
