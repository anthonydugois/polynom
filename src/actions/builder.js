import * as ActionTypes from "../constants/ActionTypes"

export function setWidth(width) {
  return {
    type: ActionTypes.SET_WIDTH,
    width,
  }
}

export function setHeight(height) {
  return {
    type: ActionTypes.SET_HEIGHT,
    height,
  }
}

export function setGridShown(isShown) {
  return {
    type: ActionTypes.SET_GRID_SHOWN,
    isShown,
  }
}

export function setGridSnap(snapToGrid) {
  return {
    type: ActionTypes.SET_GRID_SNAP,
    snapToGrid,
  }
}

export function setGridSize(size) {
  return {
    type: ActionTypes.SET_GRID_SIZE,
    size,
  }
}
