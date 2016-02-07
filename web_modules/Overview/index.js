import { connect } from "react-redux"
import * as pointsActions from "../../src/actions/points"
import { activePathsSelector } from "../../src/selectors/activePaths"
import { activePointsSelector } from "../../src/selectors/activePoints"
import Overview from "./Overview"

const mapStateToProps = (state) => ({
  builder: state.builder,
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
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Overview)
