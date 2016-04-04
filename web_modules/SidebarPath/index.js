import { connect } from "react-redux"
import { projectsActions, pathsActions, pointsActions } from "../../src/actions"
import { parsePathCode } from "../../src/utils"
import SidebarPath from "./SidebarPath"

const mapStateToProps = (state) => ({
  pathsById: state.present.pathsById,
  pointsById: state.present.pointsById,
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
    dispatch(projectsActions.update(props.project.id))
  },
  onNameChange(name) {
    dispatch(pathsActions.setPathName(props.path.id, name))
    dispatch(projectsActions.update(props.project.id))
  },
  onPathCodeChange(d) {
    const { isClosed, isRelative, points } = parsePathCode(d)

    dispatch(pathsActions.setClosedPath(props.path.id, isClosed))
    dispatch(pathsActions.setRelativePath(props.path.id, isRelative))
    dispatch(pointsActions.removePoints(props.path.points))

    points.forEach((point) =>
      dispatch(pointsActions.createPoint(props.path.id, ...point)))

    dispatch(projectsActions.update(props.project.id))
  },
  onRelativeChange(isRelative) {
    dispatch(pathsActions.setRelativePath(props.path.id, isRelative))
    dispatch(projectsActions.update(props.project.id))
  },
  onClosedChange(isClosed) {
    dispatch(pathsActions.setClosedPath(props.path.id, isClosed))
    dispatch(projectsActions.update(props.project.id))
  },
  onFilledChange(isFilled) {
    dispatch(pathsActions.setFilledPath(props.path.id, isFilled))
    dispatch(projectsActions.update(props.project.id))
  },
  onBorderedChange(isBordered) {
    dispatch(pathsActions.setBorderedPath(props.path.id, isBordered))
    dispatch(projectsActions.update(props.project.id))
  },
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SidebarPath)
