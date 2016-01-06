import * as types from "../constants/ActionTypes"

export function setWidth(width) {
  return {
    type: types.SET_WIDTH,
    width,
  }
}

export function setHeight(height) {
  return {
    type: types.SET_HEIGHT,
    height,
  }
}

export function setGrid(isShown, snapToGrid, size) {
  return {
    type: types.SET_GRID,
    isShown,
    snapToGrid,
    size,
  }
}
