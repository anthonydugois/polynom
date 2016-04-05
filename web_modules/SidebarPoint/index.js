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
    dispatch(projectsActions.update(props.project.id))
    dispatch(pointsActions.setPointCode(pointId, code))
  },
  onXPositionChange(pointId, x) {
    dispatch(projectsActions.update(props.project.id))
    dispatch(pointsActions.setPointX(pointId, x))
  },
  onYPositionChange(pointId, y) {
    dispatch(projectsActions.update(props.project.id))
    dispatch(pointsActions.setPointY(pointId, y))
  },
  onParamsChange(pointId, parameters) {
    dispatch(projectsActions.update(props.project.id))
    dispatch(pointsActions.setPointParameters(pointId, parameters))
  },
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SidebarPoint)
