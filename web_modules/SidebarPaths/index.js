import { connect } from "react-redux"
import * as pathsActions from "../../src/actions/paths"
import { activePathsSelector } from "../../src/selectors/activePaths"
import SidebarPaths from "./SidebarPaths"

const mapStateToProps = (state) => ({
  builder: state.builder,
  pathsById: state.pathsById,
  activePaths: activePathsSelector(state),
})

const mapDispatchToProps = (dispatch) => ({
  onAddClick(x, y) {
    dispatch(pathsActions.createPath(x, y))
  },
  onRemoveClick(pathIds) {
    dispatch(pathsActions.removePaths(pathIds))
  },
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SidebarPaths)
