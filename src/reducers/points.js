import * as ActionTypes from "../constants/ActionTypes"

const initialState = {
  0: {
    id: 0,
    code: "M",
    x: 50,
    y: 50,
    isActive: true,
    parameters: {},
  },
}

const point = (state, action) => {
  switch (action.type) {
  case ActionTypes.ADD_POINT:
    return {
      id: action.pointId,
      code: action.code,
      x: action.x,
      y: action.y,
      isActive: true,
      parameters: action.parameters,
    }

  case ActionTypes.SET_POINT_CODE:
    return {
      ...state,
      code: action.code,
    }

  // set position of only one point
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

  // set position of multiple points
  // update anchors at the same time
  case ActionTypes.SET_POINTS_X:
    return {
      ...state,
      x: state.x + action.dx,
      parameters: {
        ...state.parameters,
        ...state.parameters.x1 && { x1: state.parameters.x1 + action.dx },
        ...state.parameters.x2 && { x2: state.parameters.x2 + action.dx },
      },
    }

  case ActionTypes.SET_POINTS_Y:
    return {
      ...state,
      y: state.y + action.dy,
      parameters: {
        ...state.parameters,
        ...state.parameters.y1 && { y1: state.parameters.y1 + action.dy },
        ...state.parameters.y2 && { y2: state.parameters.y2 + action.dy },
      },
    }

  case ActionTypes.DEACTIVATE_POINTS:
    return {
      ...state,
      isActive: false,
    }

  case ActionTypes.SET_ACTIVE_POINTS:
    return {
      ...state,
      isActive: action.isActive,
    }

  case ActionTypes.SET_POINT_PARAMETERS:
    return {
      ...state,
      parameters: {
        ...state.parameters,
        ...action.parameters,
      },
    }

  default:
    return state
  }
}

export default (state = initialState, action) => {
  switch (action.type) {
  case ActionTypes.ADD_POINT:
    return {
      ...state,
      [action.pointId]: point(undefined, action),
    }

  case ActionTypes.DEACTIVATE_POINTS:
    return Object.keys(state).reduce((acc, key) => ({
      ...acc,
      [key]: point(state[key], action),
    }), {})

  case ActionTypes.SET_ACTIVE_POINTS:
  case ActionTypes.SET_POINTS_X:
  case ActionTypes.SET_POINTS_Y:
    return Object.keys(state).reduce((acc, key) => ({
      ...acc,
      [key]: action.pointIds.includes(state[key].id) ?
        point(state[key], action) : state[key],
    }), {})

  case ActionTypes.SET_POINT_X:
  case ActionTypes.SET_POINT_Y:
  case ActionTypes.SET_POINT_CODE:
  case ActionTypes.SET_POINT_PARAMETERS:
    return {
      ...state,
      [action.pointId]: point(state[action.pointId], action),
    }

  default:
    return state
  }
}
