import { connect } from "react-redux"
import SidebarSettings from "./SidebarSettings"
import { projectsActions } from "../../src/actions"

const mapStateToProps = (state) => state.present

const mapDispatchToProps = (dispatch, { project }) => ({
  onWidthChange(width) {
    dispatch(projectsActions.setWidth(project.id, width))
  },
  onHeightChange(height) {
    dispatch(projectsActions.setHeight(project.id, height))
  },
  onGridShowChange(gridShow) {
    dispatch(projectsActions.setGridShow(project.id, gridShow))
  },
  onGridSnapChange(gridSnap) {
    dispatch(projectsActions.setGridSnap(project.id, gridSnap))
  },
  onGridSizeChange(gridSize) {
    dispatch(projectsActions.setGridSize(project.id, gridSize))
  },
  onPointCodeShowChange(pointCodeShow) {
    dispatch(projectsActions.setPointCodeShow(
      project.id,
      pointCodeShow
    ))
  },
  onPathBboxShowChange(pathBoundingBoxShow) {
    dispatch(projectsActions.setPathBboxShow(
      project.id,
      pathBoundingBoxShow
    ))
  },
  onKeyboardIncrementChange(keyboardIncrement) {
    dispatch(projectsActions.setKeyboardIncrement(
      project.id,
      keyboardIncrement
    ))
  },
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SidebarSettings)
