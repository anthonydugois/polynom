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

function path(state, action) {
  switch (action.type) {

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
      points: state.points.reduce((acc, id) =>
        id === action.activePointId ?
          [...acc, id, action.pointId] : [...acc, id], []),
    }

  case ActionTypes.REMOVE_POINT:
    return {
      ...state,
      points: state.points.filter((pointId) =>
        pointId !== action.pointId),
    }

  default:
    return state
  }
}

export default function paths(state = initialState, action) {
  switch (action.type) {

  /**
   * Insert a path just after the active one
   */
  case ActionTypes.ADD_PATH:
    const newId = Math.max(...Object.keys(state)) + 1

    return {
      ...state,
      [newId]: {
        id: newId,
        name: `Path ${ newId }`,
        isActive: false,
        isClosed: false,
        isRelative: false,
        isFilled: false,
        points: [],
      },
    }

  /**
   * Remove a path
   */
  case ActionTypes.REMOVE_PATH:
    return Object.keys(state).reduce((acc, id) =>
      state[id].id === action.pathId ?
        { ...acc } : { ...acc, [id]: state[id] }, {})

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
