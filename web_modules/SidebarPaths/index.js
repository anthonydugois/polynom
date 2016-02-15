import { connect } from "react-redux"
import { pathsActions } from "../../src/actions"
import { activePathsSelector } from "../../src/selectors"
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
