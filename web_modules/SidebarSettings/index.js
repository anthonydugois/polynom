import { connect } from "react-redux"
import SidebarSettings from "./SidebarSettings"
import { projectsActions } from "../../src/actions"

const mapStateToProps = (state) => state

const mapDispatchToProps = (dispatch, props) => ({
  onNameChange(name) {
    dispatch(projectsActions.setName(props.project.id, name))
  },
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SidebarSettings)
