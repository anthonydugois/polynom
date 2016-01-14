import React, { Component, PropTypes } from "react"
import { connect } from "react-redux"
import Button from "Button"
import SidebarPath from "./SidebarPath"

import {
  addPath,
  removePath,
  setActivePath,
  setRelative,
  setClosed,
  setFilled,
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
      dispatch(addPath(x, y)),
    onRemoveClick: (pathId) =>
      dispatch(removePath(pathId)),
    onPathClick: (pathId) =>
      dispatch(setActivePath(pathId)),
    onRelativeChange: (pathId, isRelative) =>
      dispatch(setRelative(pathId, isRelative)),
    onClosedChange: (pathId, isClosed) =>
      dispatch(setClosed(pathId, isClosed)),
    onFilledChange: (pathId, isFilled) =>
      dispatch(setFilled(pathId, isFilled)),
  }
}

class SidebarPaths extends Component {
  handleAddClick = (e) => {
    const { builder } = this.props

    this.props.onAddClick(builder.width / 2, builder.height / 2)
  };

  renderSidebarPath = (path) => {
    return (
      <SidebarPath
        key={ path.id }
        path={ path }
        showRemoveButton={ Object.keys(this.props.paths).length > 1 }
        onPathClick={ this.props.onPathClick }
        onRemoveClick={ this.props.onRemoveClick }
        onRelativeChange={ this.props.onRelativeChange }
        onClosedChange={ this.props.onClosedChange }
        onFilledChange={ this.props.onFilledChange } />
    )
  };

  render() {
    const { paths } = this.props

    return (
      <div className="ad-SidebarPaths">
        <div className="ad-SidebarPaths-module">
          { Object.keys(paths).map((id) => this.renderSidebarPath(paths[id])) }
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
