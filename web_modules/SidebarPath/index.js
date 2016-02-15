import { connect } from "react-redux"
import { pathsActions, pointsActions } from "../../src/actions"
import SidebarPath from "./SidebarPath"

const mapStateToProps = (state) => state

const mapDispatchToProps = (dispatch, ownProps) => ({
  onPathCtrlClick(isActive) {
    dispatch(pathsActions.setActivePaths([ownProps.path.id], isActive))
    dispatch(pointsActions.setActivePoints(ownProps.path.points, isActive))
  },
  onPathClick() {
    dispatch(pointsActions.deactivatePoints())
    dispatch(pathsActions.deactivatePaths())
    dispatch(pathsActions.setActivePaths([ownProps.path.id], true))
    dispatch(pointsActions.setActivePoints(ownProps.path.points, true))
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
