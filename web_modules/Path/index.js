import { connect } from "react-redux"
import { pathsActions, pointsActions } from "../../src/actions"
import Path from "./Path"

const mapStateToProps = (state) => state

const mapDispatchToProps = (dispatch, { path }) => ({
  onPathAddActive() {
    dispatch(pathsActions.setActivePaths([path.id], true))
    dispatch(pointsActions.setActivePoints(path.points, true))
  },
  onPathActive() {
    dispatch(pathsActions.deactivatePaths())
    dispatch(pointsActions.deactivatePoints())
    dispatch(pathsActions.setActivePaths([path.id], true))
    dispatch(pointsActions.setActivePoints(path.points, true))
  },
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Path)
