import { connect } from "react-redux"
import { pathsActions, pointsActions } from "../../src/actions"
import * as selectors from "../../src/selectors"
import Overview from "./Overview"

const mapStateToProps = (state, props) => ({
  pathsById: state.pathsById,
  pointsById: state.pointsById,
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
    dispatch(pathsActions.createPath(props.project.id, x, y))
  },
  onOverviewCreatePoint(pathId, code, x, y, parameters) {
    dispatch(pointsActions.createPoint(pathId, code, x, y, parameters))
  },
  onOverviewDelete(pointIds) {
    dispatch(pointsActions.deletePoints(pointIds))
  },
  onXPositionsChange(pointIds, dx) {
    dispatch(pointsActions.setPointsX(pointIds, dx))
  },
  onYPositionsChange(pointIds, dy) {
    dispatch(pointsActions.setPointsY(pointIds, dy))
  },
  onParametersChange(pointId, parameters) {
    dispatch(pointsActions.setPointParameters(pointId, parameters))
  },
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Overview)
