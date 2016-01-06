import {
  SET_WIDTH,
  SET_HEIGHT,
  SET_GRID,
} from "../constants/ActionTypes"

const initialState = {
  width: 1000,
  height: 800,
  grid: {
    isShown: true,
    snapToGrid: true,
    size: 50,
  },
}

export default function builder(state = initialState, action) {
  switch (action.type) {
  case SET_WIDTH:
    return {
      ...state,
      width: action.width,
    }

  case SET_HEIGHT:
    return {
      ...state,
      height: action.height,
    }

  case SET_GRID:
    return {
      ...state,
      grid: {
        isShown: action.isShown,
        snapToGrid: action.snapToGrid,
        size: action.size,
      },
    }

  default:
    return state
  }
}
