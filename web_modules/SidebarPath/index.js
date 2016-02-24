import { connect } from "react-redux"
import { pathsActions, pointsActions } from "../../src/actions"
import { parsePathCode } from "../../src/utils"
import SidebarPath from "./SidebarPath"

const mapStateToProps = (state) => ({
  pathsById: state.pathsById,
  pointsById: state.pointsById,
})

const mapDispatchToProps = (dispatch, props) => ({
  onActivate(pathIds, pointIds) {
    dispatch(pathsActions.setActivePaths(pathIds, true))
    dispatch(pointsActions.setActivePoints(pointIds, true))
  },
  onDeactivate(pathIds, pointIds) {
    dispatch(pathsActions.setActivePaths(pathIds, false))
    dispatch(pointsActions.setActivePoints(pointIds, false))
  },
  onPathMove(projectId, insertAt, pathId) {
    dispatch(pathsActions.removePaths([pathId]))
    dispatch(pathsActions.insertPath(projectId, insertAt, pathId))
  },
  onNameChange(name) {
    dispatch(pathsActions.setPathName(props.path.id, name))
  },
  onPathCodeChange(d) {
    const { isClosed, isRelative, points } = parsePathCode(d)

    dispatch(pathsActions.setClosedPath(props.path.id, isClosed))
    dispatch(pathsActions.setRelativePath(props.path.id, isRelative))
    dispatch(pointsActions.removePoints(props.path.points))

    points.forEach((point) =>
      dispatch(pointsActions.createPoint(props.path.id, ...point)))
  },
  onRelativeChange(isRelative) {
    dispatch(pathsActions.setRelativePath(props.path.id, isRelative))
  },
  onClosedChange(isClosed) {
    dispatch(pathsActions.setClosedPath(props.path.id, isClosed))
  },
  onFilledChange(isFilled) {
    dispatch(pathsActions.setFilledPath(props.path.id, isFilled))
  },
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SidebarPath)
