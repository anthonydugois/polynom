import * as ActionTypes from "../constants/ActionTypes"

export function setGridShow(gridShow) {
  return {
    type: ActionTypes.SET_GRID_SHOW,
    gridShow,
  }
}

export function setGridSnap(gridSnap) {
  return {
    type: ActionTypes.SET_GRID_SNAP,
    gridSnap,
  }
}

export function setGridSize(gridSize) {
  return {
    type: ActionTypes.SET_GRID_SIZE,
    gridSize,
  }
}

export function setPointCodeShow(pointCodeShow) {
  return {
    type: ActionTypes.SET_POINT_CODE_SHOW,
    pointCodeShow,
  }
}

export function setPathBboxShow(pathBoundingBoxShow) {
  return {
    type: ActionTypes.SET_PATH_BBOX_SHOW,
    pathBoundingBoxShow,
  }
}

export function setKeyboardIncrement(keyboardIncrement) {
  return {
    type: ActionTypes.SET_KEYBOARD_INCREMENT,
    keyboardIncrement,
  }
}
