import { connect } from "react-redux"
import * as pathsActions from "../../src/actions/paths"
import * as pointsActions from "../../src/actions/points"
import Point from "./Point"

const mapStateToProps = (state) => state

const mapDispatchToProps = (dispatch, ownProps) => ({
  onPointCtrlClick() {
    dispatch(pathsActions.setActivePath(ownProps.path.id, true))
    dispatch(pointsActions.setActivePoint(ownProps.point.id, true))
  },
  onPointClick() {
    dispatch(pathsActions.deactivatePaths())
    dispatch(pointsActions.deactivatePoints())
    dispatch(pathsActions.setActivePath(ownProps.path.id, true))
    dispatch(pointsActions.setActivePoint(ownProps.point.id, true))
  },
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Point)
