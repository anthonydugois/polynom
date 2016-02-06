import { connect } from "react-redux"
import * as pointsActions from "../../src/actions/points"
import { activePathsSelector } from "../../src/selectors/activePaths"
import Overview from "./Overview"

const mapStateToProps = (state) => ({
  builder: state.builder,
  pathsById: state.pathsById,
  pointsById: state.pointsById,
  activePaths: activePathsSelector(state),
})

const mapDispatchToProps = (dispatch) => ({
  onOverviewDblClick(pathId, code, x, y, parameters = {}) {
    dispatch(pointsActions.createPoint(pathId, code, x, y, parameters))
  },
  onXPositionChange(pointId, x) {
    dispatch(pointsActions.setPointX(pointId, x))
  },
  onYPositionChange(pointId, y) {
    dispatch(pointsActions.setPointY(pointId, y))
  },
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Overview)
