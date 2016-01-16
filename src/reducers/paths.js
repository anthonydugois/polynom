import * as ActionTypes from "../constants/ActionTypes"

const initialState = {
  paths: [0],
  pathsById: {
    0: {
      id: 0,
      name: "Default",
      isActive: true,
      isClosed: false,
      isRelative: false,
      isFilled: false,
      points: [0],
    },
  },
}

const path = (state, action) => {
  switch (action.type) {
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

  case ActionTypes.SET_PATH_NAME:
    return {
      ...state,
      name: action.name,
    }

  case ActionTypes.SET_ACTIVE_PATH:
    return {
      ...state,
      isActive: state.id === action.pathId,
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

  case ActionTypes.ADD_POINT:
    return {
      ...state,
      points: [
        ...state.points.slice(0, action.insertAt),
        action.pointId,
        ...state.points.slice(action.insertAt),
      ],
    }

  case ActionTypes.REMOVE_POINT:
    return {
      ...state,
      points: state.points.filter((id) => id !== action.pointId),
    }

  default:
    return state
  }
}

function pathsById(state, action) {
  switch (action.type) {
  case ActionTypes.ADD_PATH:
    return {
      ...state,
      [action.pathId]: path(undefined, action),
    }

  case ActionTypes.SET_ACTIVE_PATH:
    return Object.keys(state).reduce((acc, key) => ({
      ...acc,
      [key]: path(state[key], action),
    }), {})

  case ActionTypes.SET_PATH_NAME:
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

export default (state = initialState, action) => {
  switch (action.type) {
  case ActionTypes.ADD_PATH:
    return {
      ...state,
      paths: [
        ...state.paths.slice(0, action.insertAt),
        action.pathId,
        ...state.paths.slice(action.insertAt),
      ],
      pathsById: pathsById(state.pathsById, action),
    }

  case ActionTypes.REMOVE_PATH:
    return {
      ...state,
      paths: state.paths.filter((id) => id !== action.pathId),
    }

  case ActionTypes.SET_PATH_NAME:
  case ActionTypes.SET_ACTIVE_PATH:
  case ActionTypes.SET_RELATIVE_PATH:
  case ActionTypes.SET_CLOSED_PATH:
  case ActionTypes.SET_FILLED_PATH:
  case ActionTypes.ADD_POINT:
  case ActionTypes.REMOVE_POINT:
    return {
      ...state,
      pathsById: pathsById(state.pathsById, action),
    }

  default:
    return state
  }
}
