import { connect } from "react-redux"
import { pathsActions, pointsActions } from "../../src/actions"
import { activePathsSelector, activePointsSelector } from "../../src/selectors"
import Overview from "./Overview"

const mapStateToProps = (state) => ({
  builder: state.builder,
  grid: state.grid,
  pathsById: state.pathsById,
  pointsById: state.pointsById,
  activePaths: activePathsSelector(state),
  activePoints: activePointsSelector(state),
})

const mapDispatchToProps = (dispatch) => ({
  onOverviewCreatePath(x, y) {
    dispatch(pathsActions.createPath(x, y))
  },
  onOverviewCreatePoint(pathId, code, x, y, parameters) {
    dispatch(pointsActions.createPoint(pathId, code, x, y, parameters))
  },
  onOverviewDeactivate() {
    dispatch(pathsActions.deactivatePaths())
    dispatch(pointsActions.deactivatePoints())
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
