import { connect } from "react-redux"
import { pathsActions, pointsActions } from "../../src/actions"
import Path from "./Path"

const mapStateToProps = (state) => state

const mapDispatchToProps = (dispatch, ownProps) => ({
  onPathClick() {
    dispatch(pathsActions.deactivatePaths())
    dispatch(pointsActions.deactivatePoints())
    dispatch(pathsActions.setActivePaths([ownProps.path.id], true))
    dispatch(pointsActions.setActivePoints(ownProps.path.points, true))
  },
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Path)
