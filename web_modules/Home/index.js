import { connect } from "react-redux"
import { projectsActions } from "../../src/actions"
import Home from "./Home"

const mapStateToProps = (state) => state.present

const mapDispatchToProps = (dispatch) => ({
  onCreateProject(name, width, height) {
    dispatch(projectsActions.addProject(name, width, height))
  },
  onRemoveProject(id) {
    dispatch(projectsActions.deleteProject(id))
  },
  onImportProjects(files) {
    [].forEach.call(files, (file) =>
      dispatch(projectsActions.importProject(file)))
  },
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home)
