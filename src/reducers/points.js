import * as ActionTypes from "../constants/ActionTypes"

const initialState = {
  0: {
    id: 0,
    code: "M",
    x: 50,
    y: 50,
    isActive: true,
    isRelative: false,
    parameters: {},
  },
}

const point = (state, action) => {
  switch (action.type) {

  /**
   * Create a new point
   */
  case ActionTypes.ADD_POINT:
    return {
      id: action.pointId,
      code: action.code,
      x: action.x,
      y: action.y,
      isActive: false,
      isRelative: action.code === action.code.toLowerCase(),
      parameters: action.parameters,
    }

  /**
   * Update SVG code and parameters
   */
  case ActionTypes.SET_POINT_CODE:
    return {
      ...state,
      code: action.code,
      isRelative: action.code === action.code.toLowerCase(),
      parameters: action.parameters,
    }

  /**
   * Set position
   */
  case ActionTypes.SET_POINT_X:
    return {
      ...state,
      x: action.x,
    }

  case ActionTypes.SET_POINT_Y:
    return {
      ...state,
      y: action.y,
    }

  /**
   * Set parameters
   */
  case ActionTypes.SET_ACTIVE_POINT:
    return {
      ...state,
      isActive: action.isActive,
    }

  case ActionTypes.SET_POINT_PARAMETERS:
    return {
      ...state,
      parameters: action.parameters,
    }

  default:
    return state
  }
}

export default (state = initialState, action) => {
  switch (action.type) {

  /**
   * Insert a point just after the active one
   */
  case ActionTypes.ADD_POINT:
    return {
      ...state,
      [action.pointId]: point(undefined, action),
    }

  /**
   * Remove a point
   */
  case ActionTypes.REMOVE_POINT:
    return Object.keys(state).reduce((acc, id) =>
      state[id].id === action.pointId ?
        { ...acc } : { ...acc, [id]: state[id] }, {})

  case ActionTypes.SET_POINT_CODE:
  case ActionTypes.SET_POINT_X:
  case ActionTypes.SET_POINT_Y:
  case ActionTypes.SET_ACTIVE_POINT:
  case ActionTypes.SET_POINT_PARAMETERS:
    return {
      ...state,
      [action.pointId]: point(state[action.pointId], action),
    }

  default:
    return state
  }
}
