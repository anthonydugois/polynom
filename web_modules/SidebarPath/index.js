import { connect } from "react-redux"
import * as pathsActions from "../../src/actions/paths"
import * as pointsActions from "../../src/actions/points"
import SidebarPath from "./SidebarPath"

const mapStateToProps = (state) => state

const mapDispatchToProps = (dispatch, ownProps) => ({
  onRemoveClick() {
    dispatch(pathsActions.deletePath(ownProps.path.id))
  },
  onPathCtrlClick(isActive) {
    dispatch(pathsActions.setActivePath(ownProps.path.id, isActive))
  },
  onPathClick() {
    dispatch(pointsActions.deactivatePoints())
    dispatch(pathsActions.deactivatePaths())
    dispatch(pathsActions.setActivePath(ownProps.path.id, true))
  },
  onNameChange(name) {
    dispatch(pathsActions.setPathName(ownProps.path.id, name))
  },
  onRelativeChange(isRelative) {
    dispatch(pathsActions.setRelativePath(ownProps.path.id, isRelative))
  },
  onClosedChange(isClosed) {
    dispatch(pathsActions.setClosedPath(ownProps.path.id, isClosed))
  },
  onFilledChange(isFilled) {
    dispatch(pathsActions.setFilledPath(ownProps.path.id, isFilled))
  },
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SidebarPath)
