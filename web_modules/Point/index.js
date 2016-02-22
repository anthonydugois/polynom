import { connect } from "react-redux"
import { pathsActions, pointsActions } from "../../src/actions"
import Point from "./Point"

const mapStateToProps = (state) => state

const mapDispatchToProps = (dispatch, props) => ({
  onPointAddActive() {
    dispatch(pathsActions.setActivePaths([props.path.id], true))
    dispatch(pointsActions.setActivePoints([props.point.id], true))
  },
  onPointActive() {
    dispatch(pathsActions.deactivatePaths())
    dispatch(pointsActions.deactivatePoints())
    dispatch(pathsActions.setActivePaths([props.path.id], true))
    dispatch(pointsActions.setActivePoints([props.point.id], true))
  },
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Point)
