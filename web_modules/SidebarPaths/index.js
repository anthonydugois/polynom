import { connect } from "react-redux"
import { pathsActions } from "../../src/actions"
import SidebarPaths from "./SidebarPaths"

const mapStateToProps = (state) => ({
  builder: state.builder,
  pathsById: state.pathsById,
})

const mapDispatchToProps = (dispatch) => ({
  onAddClick(x, y) {
    dispatch(pathsActions.createPath(x, y))
  },
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SidebarPaths)
