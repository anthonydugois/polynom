import * as types from "../constants/ActionTypes"

export function addPath(x, y) {
  return {
    type: types.ADD_PATH,
    x,
    y,
  }
}

export function removePath(id) {
  return {
    type: types.REMOVE_PATH,
    id,
  }
}

export function setActivePath(id) {
  return {
    type: types.SET_ACTIVE_PATH,
    id,
  }
}

export function setRelative(id, isRelative) {
  return {
    type: types.SET_RELATIVE,
    id,
    isRelative,
  }
}

export function setClosed(id, isClosed) {
  return {
    type: types.SET_CLOSED,
    id,
    isClosed,
  }
}

export function setFilled(id, isFilled) {
  return {
    type: types.SET_FILLED,
    id,
    isFilled,
  }
}
