import * as ActionTypes from "../constants/ActionTypes"

const initialState = {
  width: 1000,
  height: 800,
  grid: {
    isShown: true,
    snapToGrid: true,
    size: 50,
  },
  paths: [0, 1],
}

const grid = (state, action) => {
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

  case ActionTypes.SET_GRID_SHOWN:
  case ActionTypes.SET_GRID_SNAP:
  case ActionTypes.SET_GRID_SIZE:
    return {
      ...state,
      grid: grid(state.grid, action),
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

  case ActionTypes.REMOVE_PATH:
    return {
      ...state,
      paths: state.paths.filter((id) => id !== action.pathId),
    }

  default:
    return state
  }
}
