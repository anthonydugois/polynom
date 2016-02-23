import { connect } from "react-redux"
import { pathsActions } from "../../src/actions"
import * as selectors from "../../src/selectors"
import SidebarPaths from "./SidebarPaths"

const mapStateToProps = (state, props) => ({
  pathsById: state.pathsById,
  activePaths: selectors.activePathsSelector(state, props),
})

const mapDispatchToProps = (dispatch, props) => ({
  onAddClick(x, y) {
    dispatch(pathsActions.createPath(props.params.projectId, x, y))
  },
  onRemoveClick(pathIds) {
    dispatch(pathsActions.removePaths(pathIds))
  },
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SidebarPaths)
