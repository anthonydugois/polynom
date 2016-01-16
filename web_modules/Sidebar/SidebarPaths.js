import React, { Component, PropTypes } from "react"
import { connect } from "react-redux"
import Button from "Button"
import SidebarPath from "./SidebarPath"

import {
  createPath,
  deletePath,
  setActivePath,
  setPathName,
  setRelativePath,
  setClosedPath,
  setFilledPath,
} from "../../src/actions/paths"

const mapStateToProps = (state) => {
  const {
    builder,
    paths,
  } = state

  return {
    builder,
    paths,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onAddClick: (x, y) =>
      dispatch(createPath(x, y)),
    onRemoveClick: (pathId) =>
      dispatch(deletePath(pathId)),
    onNameChange: (pathId, name) =>
      dispatch(setPathName(pathId, name)),
    onPathClick: (pathId) =>
      dispatch(setActivePath(pathId)),
    onRelativeChange: (pathId, isRelative) =>
      dispatch(setRelativePath(pathId, isRelative)),
    onClosedChange: (pathId, isClosed) =>
      dispatch(setClosedPath(pathId, isClosed)),
    onFilledChange: (pathId, isFilled) =>
      dispatch(setFilledPath(pathId, isFilled)),
  }
}

class SidebarPaths extends Component {
  handleAddClick = (e) => {
    const { builder } = this.props

    this.props.onAddClick(builder.width / 2, builder.height / 2)
  };

  renderSidebarPath = (key, index, paths) => {
    const { pathsById } = this.props.paths
    const path = pathsById[key]

    return (
      <SidebarPath
        key={ key }
        path={ path }
        showRemoveButton={ paths.length > 1 }
        onPathClick={ this.props.onPathClick }
        onRemoveClick={ this.props.onRemoveClick }
        onNameChange={ this.props.onNameChange }
        onRelativeChange={ this.props.onRelativeChange }
        onClosedChange={ this.props.onClosedChange }
        onFilledChange={ this.props.onFilledChange } />
    )
  };

  render() {
    const { paths } = this.props.paths

    return (
      <div className="ad-SidebarPaths">
        <div className="ad-SidebarPaths-module">
          { paths.map(this.renderSidebarPath) }
        </div>

        <div className="ad-SidebarPaths-actions">
          <Button
            onClick={ this.handleAddClick }>
            New path
          </Button>
        </div>
      </div>
    )
  }
}

SidebarPaths.propTypes = {
  onAddClick: PropTypes.func.isRequired,
  onRemoveClick: PropTypes.func.isRequired,
  onPathClick: PropTypes.func.isRequired,
  onNameChange: PropTypes.func.isRequired,
  onRelativeChange: PropTypes.func.isRequired,
  onClosedChange: PropTypes.func.isRequired,
  onFilledChange: PropTypes.func.isRequired,
  builder: PropTypes.object.isRequired,
  paths: PropTypes.object.isRequired,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SidebarPaths)
