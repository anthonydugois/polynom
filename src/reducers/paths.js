import * as ActionTypes from "../constants/ActionTypes"

const initialState = {
  0: {
    id: 0,
    name: "Path 1",
    isActive: true,
    isClosed: false,
    isRelative: false,
    isFilled: false,
    points: [0],
  },
}

const path = (state, action) => {
  switch (action.type) {

  /**
   * Create a new path
   */
  case ActionTypes.ADD_PATH:
    return {
      id: action.pathId,
      name: `Path ${ action.pathId }`,
      isActive: false,
      isClosed: false,
      isRelative: false,
      isFilled: false,
      points: [],
    }

  /**
   * Path parameters
   */
  case ActionTypes.SET_ACTIVE_PATH:
    return {
      ...state,
      isActive: action.isActive,
    }

  case ActionTypes.SET_RELATIVE_PATH:
    return {
      ...state,
      isRelative: action.isRelative,
    }

  case ActionTypes.SET_CLOSED_PATH:
    return {
      ...state,
      isClosed: action.isClosed,
    }

  case ActionTypes.SET_FILLED_PATH:
    return {
      ...state,
      isFilled: action.isFilled,
    }

  /**
   * Insert the added point in the corresponding path
   */
  case ActionTypes.ADD_POINT:
    return {
      ...state,
      points: [
        ...state.points.slice(0, action.insertAt),
        action.pointId,
        ...state.points.slice(action.insertAt),
      ],
    }

  /**
   * Remove a point from the path
   */
  case ActionTypes.REMOVE_POINT:
    return {
      ...state,
      points: state.points.filter((pointId) => pointId !== action.pointId),
    }

  default:
    return state
  }
}

export default (state = initialState, action) => {
  switch (action.type) {

  /**
   * Insert a path just after the active one
   */
  case ActionTypes.ADD_PATH:
    return {
      ...state,
      [action.pathId]: path(undefined, action),
    }

  /**
   * Remove a path
   */
  case ActionTypes.REMOVE_PATH:
    return Object.keys(state).reduce((acc, id) => {
      if (state[id].id === action.pathId) {
        return { ...acc }
      }

      return { ...acc, [id]: state[id] }
    }, {})

  case ActionTypes.SET_ACTIVE_PATH:
  case ActionTypes.SET_RELATIVE_PATH:
  case ActionTypes.SET_CLOSED_PATH:
  case ActionTypes.SET_FILLED_PATH:
  case ActionTypes.ADD_POINT:
  case ActionTypes.REMOVE_POINT:
    return {
      ...state,
      [action.pathId]: path(state[action.pathId], action),
    }

  default:
    return state
  }
}
