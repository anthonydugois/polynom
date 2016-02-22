import { connect } from "react-redux"
import { pathsActions, pointsActions } from "../../src/actions"
import Path from "./Path"

const mapStateToProps = (state) => state

const mapDispatchToProps = (dispatch, props) => ({
  onPathAddActive() {
    dispatch(pathsActions.setActivePaths([props.path.id], true))
    dispatch(pointsActions.setActivePoints(props.path.points, true))
  },
  onPathActive() {
    dispatch(pathsActions.deactivatePaths())
    dispatch(pointsActions.deactivatePoints())
    dispatch(pathsActions.setActivePaths([props.path.id], true))
    dispatch(pointsActions.setActivePoints(props.path.points, true))
  },
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Path)
