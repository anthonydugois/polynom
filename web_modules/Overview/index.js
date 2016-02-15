import { connect } from "react-redux"
import { pointsActions } from "../../src/actions"
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
  onOverviewDblClick(pathId, code, x, y, parameters = {}) {
    dispatch(pointsActions.createPoint(pathId, code, x, y, parameters))
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
