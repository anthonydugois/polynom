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
  case ActionTypes.SET_RELATIVE:
    return {
      ...state,
      isRelative: action.isRelative,
    }

  case ActionTypes.SET_CLOSED:
    return {
      ...state,
      isClosed: action.isClosed,
    }

  case ActionTypes.SET_FILLED:
    return {
      ...state,
      isFilled: action.isFilled,
    }

  case ActionTypes.INSERT_POINT:
    return {
      ...state,
      points: state.points.reduce((acc, id) => {
        if (id === action.activePointId) {
          return [...acc, id, action.pointId]
        }

        return [...acc, id]
      }, []),
    }

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

  /**
   * Make a path active; only one path at a time can be active
   */
  case ActionTypes.SET_ACTIVE_PATH:
    return Object.keys(state).reduce((acc, id) => ({
      ...acc,
      [id]: {
        ...state[id],
        isActive: state[id].id === action.pathId,
      },
    }), {})

  case ActionTypes.SET_RELATIVE:
  case ActionTypes.SET_CLOSED:
  case ActionTypes.SET_FILLED:
  case ActionTypes.INSERT_POINT:
  case ActionTypes.REMOVE_POINT:
    return {
      ...state,
      [action.pathId]: path(state[action.pathId], action),
    }

  default:
    return state
  }
}
