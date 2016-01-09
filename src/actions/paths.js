import * as types from "../constants/ActionTypes"

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
