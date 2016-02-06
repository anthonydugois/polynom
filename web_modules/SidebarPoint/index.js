import { connect } from "react-redux"
import * as pointsActions from "../../src/actions/points"
import {
  activePointsSelector,
  pointSelector,
  previousPointSelector,
} from "../../src/selectors/activePoints"
import SidebarPoint from "./SidebarPoint"

const mapStateToProps = (state) => ({
  builder: state.builder,
  gridStep: state.builder.grid.snapToGrid ? state.builder.grid.size : 1,
  activePoints: activePointsSelector(state),
  point: pointSelector(state),
  previousPoint: previousPointSelector(state),
})

const mapDispatchToProps = (dispatch) => ({
  onCodeChange(pointId, code, parameters) {
    dispatch(pointsActions.setPointCode(pointId, code, parameters))
  },
  onXPositionChange(pointId, x) {
    dispatch(pointsActions.setPointX(pointId, x))
  },
  onYPositionChange(pointId, y) {
    dispatch(pointsActions.setPointY(pointId, y))
  },
  onActiveChange(pathId, pointId) {
    dispatch(pointsActions.activatePoint(pathId, pointId))
  },
  onParamsChange(pointId, parameters) {
    dispatch(pointsActions.setPointParameters(pointId, parameters))
  },
  onRemoveClick(pointIds) {
    dispatch(pointsActions.removePoints(pointIds))
  },
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SidebarPoint)
