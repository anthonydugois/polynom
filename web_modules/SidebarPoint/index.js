import { connect } from "react-redux"
import { projectsActions, pointsActions } from "../../src/actions"
import * as selectors from "../../src/selectors"
import SidebarPoint from "./SidebarPoint"

const mapStateToProps = (state, props) => ({
  gridStep: selectors.projectGridStepSelector(state, props),
  activePoints: selectors.activePointsSelector(state, props),
  point: selectors.pointSelector(state, props),
  previousPoint: selectors.previousPointSelector(state, props),
})

const mapDispatchToProps = (dispatch, props) => ({
  onCodeChange(pointId, code) {
    dispatch(pointsActions.setPointCode(pointId, code))
    dispatch(projectsActions.update(props.project.id))
  },
  onXPositionChange(pointId, x) {
    dispatch(pointsActions.setPointX(pointId, x))
    dispatch(projectsActions.update(props.project.id))
  },
  onYPositionChange(pointId, y) {
    dispatch(pointsActions.setPointY(pointId, y))
    dispatch(projectsActions.update(props.project.id))
  },
  onParamsChange(pointId, parameters) {
    dispatch(pointsActions.setPointParameters(pointId, parameters))
    dispatch(projectsActions.update(props.project.id))
  },
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SidebarPoint)
