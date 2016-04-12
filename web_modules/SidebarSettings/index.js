import { connect } from "react-redux"
import SidebarSettings from "./SidebarSettings"
import { settingsActions, projectsActions } from "../../src/actions"

const mapStateToProps = (state) => state.present

const mapDispatchToProps = (dispatch, { project }) => ({
  onWidthChange(width) {
    dispatch(projectsActions.setWidth(project.id, width))
  },
  onHeightChange(height) {
    dispatch(projectsActions.setHeight(project.id, height))
  },
  onGridShowChange(gridShow) {
    dispatch(settingsActions.setGridShow(gridShow))
  },
  onGridSnapChange(gridSnap) {
    dispatch(settingsActions.setGridSnap(gridSnap))
  },
  onGridSizeChange(gridSize) {
    dispatch(settingsActions.setGridSize(gridSize))
  },
  onPointCodeShowChange(pointCodeShow) {
    dispatch(settingsActions.setPointCodeShow(pointCodeShow))
  },
  onPathBboxShowChange(pathBoundingBoxShow) {
    dispatch(settingsActions.setPathBboxShow(pathBoundingBoxShow))
  },
  onKeyboardIncrementChange(keyboardIncrement) {
    dispatch(settingsActions.setKeyboardIncrement(keyboardIncrement))
  },
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SidebarSettings)
