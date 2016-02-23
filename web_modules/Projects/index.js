import { connect } from "react-redux"
import Projects from "./Projects"

const mapStateToProps = (state) => ({
  projectsById: state.projectsById,
})

//const mapDispatchToProps = (dispatch) => ({})

export default connect(
  mapStateToProps,
  //mapDispatchToProps,
)(Projects)
