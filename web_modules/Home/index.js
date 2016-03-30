import { connect } from "react-redux"
import { projectsActions } from "../../src/actions"
import Home from "./Home"

const mapStateToProps = (state) => state

const mapDispatchToProps = (dispatch) => ({
  onCreateProject(name, width, height) {
    dispatch(projectsActions.addProject(name, width, height))
  },
  onRemoveProject(id) {
    dispatch(projectsActions.removeProject(id))
  },
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home)
