import { connect } from "react-redux"
import { projectsActions } from "../../src/actions"
import Home from "./Home"

const mapStateToProps = (state) => state

const mapDispatchToProps = (dispatch) => ({
  onCreateProject(name, width, height) {
    dispatch(projectsActions.addProject(name, width, height))
  },
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home)
