import { connect } from "react-redux"
import { projectsActions, pathsActions } from "../../src/actions"
import * as selectors from "../../src/selectors"
import SidebarPaths from "./SidebarPaths"

const mapStateToProps = (state, props) => ({
  pathsById: state.present.pathsById,
  activePaths: selectors.activePathsSelector(state, props),
  activePoints: selectors.activePointsSelector(state, props),
})

const mapDispatchToProps = (dispatch, props) => ({
  onAddClick(x, y) {
    dispatch(projectsActions.update(props.project.id))
    dispatch(pathsActions.createPath(props.project.id, x, y))
  },
  onRemoveClick(pathIds) {
    dispatch(projectsActions.update(props.project.id))
    dispatch(pathsActions.deletePaths(pathIds))
  },
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SidebarPaths)
