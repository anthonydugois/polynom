import * as ActionTypes from "../constants/ActionTypes"

const initialState = {
  isShown: true,
  snapToGrid: false,
  size: 50,
}

export default (state = initialState, action) => {
  switch (action.type) {
  case ActionTypes.SET_GRID_SHOWN:
    return {
      ...state,
      isShown: action.isShown,
    }

  case ActionTypes.SET_GRID_SNAP:
    return {
      ...state,
      snapToGrid: action.snapToGrid,
    }

  case ActionTypes.SET_GRID_SIZE:
    return {
      ...state,
      size: action.size,
    }

  default:
    return state
  }
}
