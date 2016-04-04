import { connect } from "react-redux"
import Navbar from "./Navbar"
import { projectsActions } from "../../src/actions"

const mapStateToProps = (state) => state.present

const mapDispatchToProps = (dispatch, props) => ({
  onProjectNameChange(name) {
    dispatch(projectsActions.setName(props.project.id, name))
    dispatch(projectsActions.update(props.project.id))
  },
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Navbar)
