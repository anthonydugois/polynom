import { connect } from "react-redux"
import { pathsActions, pointsActions } from "../../src/actions"
import { parsePathCode } from "../../src/utils"
import SidebarPath from "./SidebarPath"

const mapStateToProps = (state) => state

const mapDispatchToProps = (dispatch, ownProps) => ({
  onPathAddActive() {
    dispatch(pathsActions.setActivePaths([ownProps.path.id], true))
    dispatch(pointsActions.setActivePoints(ownProps.path.points, true))
  },
  onPathActive() {
    dispatch(pointsActions.deactivatePoints())
    dispatch(pathsActions.deactivatePaths())
    dispatch(pathsActions.setActivePaths([ownProps.path.id], true))
    dispatch(pointsActions.setActivePoints(ownProps.path.points, true))
  },
  onNameChange(name) {
    dispatch(pathsActions.setPathName(ownProps.path.id, name))
  },
  onPathCodeChange(d) {
    const { isClosed, points } = parsePathCode(d)

    dispatch(pathsActions.setClosedPath(ownProps.path.id, isClosed))
    dispatch(pointsActions.removePoints(ownProps.path.points))

    points.forEach((point) => {
      dispatch(pointsActions.createPoint(ownProps.path.id, ...point))
    })
  },
  onRelativeChange(isRelative) {
    dispatch(pathsActions.setRelativePath(ownProps.path.id, isRelative))
  },
  onClosedChange(isClosed) {
    dispatch(pathsActions.setClosedPath(ownProps.path.id, isClosed))
  },
  onFilledChange(isFilled) {
    dispatch(pathsActions.setFilledPath(ownProps.path.id, isFilled))
  },
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SidebarPath)
