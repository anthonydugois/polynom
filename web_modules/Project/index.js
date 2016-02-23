import { connect } from "react-redux"
import Project from "./Project"
import * as selectors from "../../src/selectors"

const mapStateToProps = (state, props) => ({
  project: selectors.projectSelector(state, props),
})

export default connect(mapStateToProps)(Project)
