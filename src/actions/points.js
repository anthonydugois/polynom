import * as types from "../constants/ActionTypes"

export function setPointCode(id, pointId, code) {
  return {
    type: types.SET_POINT_CODE,
    id,
    pointId,
    code,
  }
}
