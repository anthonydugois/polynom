import "./styles"

import React, { Component, PropTypes } from "react"

class Import extends Component {
  handleClick = () => {
    this.file.click()
  };

  render() {
    const {
      onChange,
      multiple,
      children,
      ...props,
    } = this.props

    return (
      <div
        className="ad-Import"
        onClick={ this.handleClick }
        { ...props }>
        <input
          ref={ (file) => this.file = file }
          type="file"
          className="ad-Import-file"
          onChange={ onChange }
          multiple={ multiple } />
        { children }
      </div>
    )
  }
}

Import.propTypes = {
  onChange: PropTypes.func.isRequired,
  multiple: PropTypes.bool,
}

export default Import
