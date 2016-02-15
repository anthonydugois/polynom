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
