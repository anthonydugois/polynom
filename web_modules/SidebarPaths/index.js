import { connect } from "react-redux"
import SidebarPaths from "./SidebarPaths"
import * as selectors from "../../src/selectors"
import { parsePathCode } from "../../src/utils"
import {
  projectsActions,
  pathsActions,
  pointsActions,
} from "../../src/actions"

const mapStateToProps = (state, props) => ({
  pathsById: state.present.pathsById,
  pointsById: state.present.pointsById,
  activePaths: selectors.activePathsSelector(state, props),
  activePoints: selectors.activePointsSelector(state, props),
})

const mapDispatchToProps = (dispatch, props) => ({
  onAddClick(x, y) {
    dispatch(projectsActions.update(props.project.id))
    dispatch(pathsActions.createPath(props.project.id, x, y))
  },
  onRemoveClick(pathIds) {
    dispatch(projectsActions.update(props.project.id))
    dispatch(pathsActions.deletePaths(pathIds))
  },
  onActivate(pathIds, pointIds) {
    dispatch(pathsActions.setActivePaths(pathIds, true))
    dispatch(pointsActions.setActivePoints(pointIds, true))
  },
  onDeactivate(pathIds, pointIds) {
    dispatch(pathsActions.setActivePaths(pathIds, false))
    dispatch(pointsActions.setActivePoints(pointIds, false))
  },
  onNameChange(name) {
    dispatch(pathsActions.setPathName(props.path.id, name))
  },
  onPathMove(projectId, insertAt, pathId) {
    dispatch(projectsActions.update(props.project.id))
    dispatch(pathsActions.removePaths([pathId]))
    dispatch(pathsActions.insertPath(projectId, insertAt, pathId))
  },
  onPathCodeChange(d) {
    const { isClosed, isRelative, points } = parsePathCode(d)

    dispatch(projectsActions.update(props.project.id))
    dispatch(pointsActions.deletePoints(props.path.points))

    points.forEach((point) => dispatch(pointsActions.createPoint(
      props.path.id,
      ...point
    )))

    dispatch(pathsActions.setClosedPath(props.path.id, isClosed))
    dispatch(pathsActions.setRelativePath(props.path.id, isRelative))
  },
  onRelativeChange(isRelative) {
    dispatch(projectsActions.update(props.project.id))
    dispatch(pathsActions.setRelativePath(props.path.id, isRelative))
  },
  onClosedChange(isClosed) {
    dispatch(projectsActions.update(props.project.id))
    dispatch(pathsActions.setClosedPath(props.path.id, isClosed))
  },
  onFilledChange(isFilled) {
    dispatch(projectsActions.update(props.project.id))
    dispatch(pathsActions.setFilledPath(props.path.id, isFilled))
  },
  onBorderedChange(isBordered) {
    dispatch(projectsActions.update(props.project.id))
    dispatch(pathsActions.setBorderedPath(props.path.id, isBordered))
  },
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SidebarPaths)
