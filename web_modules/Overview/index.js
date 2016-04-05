import { connect } from "react-redux"
import { projectsActions, pathsActions, pointsActions } from "../../src/actions"
import * as selectors from "../../src/selectors"
import Overview from "./Overview"

const mapStateToProps = (state, props) => ({
  pathsById: state.present.pathsById,
  pointsById: state.present.pointsById,
  activePaths: selectors.activePathsSelector(state, props),
  activePoints: selectors.activePointsSelector(state, props),
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
  onOverviewCreatePath(x, y) {
    dispatch(projectsActions.update(props.project.id))
    dispatch(pathsActions.createPath(props.project.id, x, y))
  },
  onOverviewCreatePoint(pathId, code, x, y, parameters) {
    dispatch(projectsActions.update(props.project.id))
    dispatch(pointsActions.createPoint(pathId, code, x, y, parameters))
  },
  onOverviewDelete(pointIds) {
    dispatch(projectsActions.update(props.project.id))
    dispatch(pointsActions.carefullyDeletePoints(pointIds))
  },
  onPointsPositionChange(pointIds, dx, dy, format) {
    dispatch(projectsActions.update(props.project.id))
    dispatch(pointsActions.setPointsPosition(pointIds, dx, dy, format))
  },
  onParametersChange(pointId, parameters) {
    dispatch(projectsActions.update(props.project.id))
    dispatch(pointsActions.setPointParameters(pointId, parameters))
  },
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Overview)
