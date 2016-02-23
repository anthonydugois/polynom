import * as ActionTypes from "../constants/ActionTypes"

export function setName(projectId, name) {
  return {
    type: ActionTypes.SET_PROJECT_NAME,
    projectId,
    name,
  }
}

export function setWidth(projectId, width) {
  return {
    type: ActionTypes.SET_PROJECT_WIDTH,
    projectId,
    width,
  }
}

export function setHeight(projectId, height) {
  return {
    type: ActionTypes.SET_PROJECT_HEIGHT,
    projectId,
    height,
  }
}

export function setGridShow(projectId, gridShow) {
  return {
    type: ActionTypes.SET_GRID_SHOW,
    projectId,
    gridShow,
  }
}

export function setGridSnap(projectId, gridSnap) {
  return {
    type: ActionTypes.SET_GRID_SNAP,
    projectId,
    gridSnap,
  }
}

export function setGridSize(projectId, gridSize) {
  return {
    type: ActionTypes.SET_GRID_SIZE,
    projectId,
    gridSize,
  }
}
