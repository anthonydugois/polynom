import React, { Component, PropTypes } from "react"
import { connect } from "react-redux"
import Button from "Button"
import SidebarPath from "./SidebarPath"

import * as pathsActions from "../../src/actions/paths"

class SidebarPaths extends Component {
  handleAddClick = (e) => {
    const {
      dispatch,
      builder,
    } = this.props

    dispatch(pathsActions.addPath(builder.width / 2, builder.height / 2))
  };

  renderSidebarPath = (path, index, paths) => {
    const { dispatch } = this.props

    return (
      <SidebarPath
        key={ path.id }
        path={ path }
        index={ index }
        paths={ paths }
        onPathClick={ (id) =>
          dispatch(pathsActions.setActivePath(id)) }
        onRemoveClick={ (id) =>
          dispatch(pathsActions.removePath(id)) }
        onRelativeChange={ (id, isRelative) =>
          dispatch(pathsActions.setRelative(id, isRelative)) }
        onClosedChange={ (id, isClosed) =>
          dispatch(pathsActions.setClosed(id, isClosed)) }
        onFilledChange={ (id, isFilled) =>
          dispatch(pathsActions.setFilled(id, isFilled)) } />
    )
  };

  render() {
    const { paths } = this.props

    return (
      <div className="ad-SidebarPaths">
        { paths.map(this.renderSidebarPath) }

        <Button
          onClick={ this.handleAddClick }>
          New path
        </Button>
      </div>
    )
  }
}

SidebarPaths.propTypes = {
  dispatch: PropTypes.func.isRequired,
  builder: PropTypes.object.isRequired,
  paths: PropTypes.array.isRequired,
}

export default connect((state) => state)(SidebarPaths)
