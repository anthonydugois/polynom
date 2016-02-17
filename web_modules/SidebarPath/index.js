import { connect } from "react-redux"
import { pathsActions, pointsActions } from "../../src/actions"
import { parsePathCode } from "../../src/utils"
import SidebarPath from "./SidebarPath"

const mapStateToProps = (state) => state

const mapDispatchToProps = (dispatch, { path }) => ({
  onPathAddActive() {
    dispatch(pathsActions.setActivePaths([path.id], true))
    dispatch(pointsActions.setActivePoints(path.points, true))
  },
  onPathActive() {
    dispatch(pointsActions.deactivatePoints())
    dispatch(pathsActions.deactivatePaths())
    dispatch(pathsActions.setActivePaths([path.id], true))
    dispatch(pointsActions.setActivePoints(path.points, true))
  },
  onNameChange(name) {
    dispatch(pathsActions.setPathName(path.id, name))
  },
  onPathCodeChange(d) {
    const { isClosed, isRelative, points } = parsePathCode(d)

    dispatch(pathsActions.setClosedPath(path.id, isClosed))
    dispatch(pathsActions.setRelativePath(path.id, isRelative))

    dispatch(pointsActions.deactivatePoints())
    dispatch(pointsActions.removePoints(path.points))

    points.forEach((p) => dispatch(pointsActions.createPoint(path.id, ...p)))
  },
  onRelativeChange(isRelative) {
    dispatch(pathsActions.setRelativePath(path.id, isRelative))
  },
  onClosedChange(isClosed) {
    dispatch(pathsActions.setClosedPath(path.id, isClosed))
  },
  onFilledChange(isFilled) {
    dispatch(pathsActions.setFilledPath(path.id, isFilled))
  },
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SidebarPath)
