import * as ActionTypes from "../constants/ActionTypes"

const initialState = {
  width: 1000,
  height: 800,
  paths: [0],
}

export default (state = initialState, action) => {
  switch (action.type) {
  case ActionTypes.SET_WIDTH:
    return {
      ...state,
      width: action.width,
    }

  case ActionTypes.SET_HEIGHT:
    return {
      ...state,
      height: action.height,
    }

  case ActionTypes.ADD_PATH:
    return {
      ...state,
      paths: [
        ...state.paths.slice(0, action.insertAt),
        action.pathId,
        ...state.paths.slice(action.insertAt),
      ],
    }

  case ActionTypes.REMOVE_PATHS:
    return {
      ...state,
      paths: state.paths.filter((id) => !action.pathIds.includes(id)),
    }

  default:
    return state
  }
}
