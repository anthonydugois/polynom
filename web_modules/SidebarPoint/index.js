import { connect } from "react-redux"
import { pointsActions } from "../../src/actions"
import {
  activePointsSelector,
  pointSelector,
  previousPointSelector,
  gridStepSelector,
} from "../../src/selectors"
import SidebarPoint from "./SidebarPoint"

const mapStateToProps = (state) => ({
  builder: state.builder,
  gridStep: gridStepSelector(state),
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
