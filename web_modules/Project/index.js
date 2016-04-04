import { connect } from "react-redux"
import { ActionCreators as undoActions } from "redux-undo"
import Project from "./Project"
import * as selectors from "../../src/selectors"

const mapStateToProps = (state, props) => ({
  project: selectors.projectSelector(state, props),
})

const mapDispatchToProps = (dispatch) => ({
  undo() {
    dispatch(undoActions.undo())
  },
  redo() {
    dispatch(undoActions.redo())
  },
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Project)
