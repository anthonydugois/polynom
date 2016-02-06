import { connect } from "react-redux"
import * as pathsActions from "../../src/actions/paths"
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
