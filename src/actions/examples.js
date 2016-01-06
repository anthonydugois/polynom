import * as types from "../constants/ActionTypes"

export function example(param) {
  return {
    type: types.EXAMPLE,
    param,
  }
}
