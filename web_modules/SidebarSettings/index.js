import { connect } from "react-redux"
import SidebarSettings from "./SidebarSettings"
import { projectsActions } from "../../src/actions"

const mapStateToProps = (state) => state

const mapDispatchToProps = (dispatch, props) => ({
  onWidthChange(width) {
    dispatch(projectsActions.setWidth(props.project.id, width))
    dispatch(projectsActions.update(props.project.id))
  },
  onHeightChange(height) {
    dispatch(projectsActions.setHeight(props.project.id, height))
    dispatch(projectsActions.update(props.project.id))
  },
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SidebarSettings)
