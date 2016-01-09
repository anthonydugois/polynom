import {
  SET_POINT_CODE,
  SET_POINT_X,
  SET_POINT_Y,
  SET_QUAD_X,
  SET_QUAD_Y,
} from "../constants/ActionTypes"

const initialState = [
  {
    id: 0,
    code: "M",
    x: 50,
    y: 50,
    isActive: false,
    isRelative: false,
    parameters: {},
  },
  {
    id: 1,
    code: "Q",
    x: 100,
    y: 100,
    isActive: true,
    isRelative: false,
    parameters: {
      x1: 150,
      y1: 75,
    },
  },
]

function Q(state = {
  x1: 0,
  y1: 0,
}, action) {
  switch (action.type) {
  case SET_QUAD_X:
    return {
      ...state,
      x1: action.x1,
    }

  case SET_QUAD_Y:
    return {
      ...state,
      y1: action.y1,
    }

  default:
    return state
  }
}

function point(state = {
  id: 0,
  code: "",
  x: 0,
  y: 0,
  isActive: false,
  isRelative: false,
  parameters: {},
}, action) {
  switch (action.type) {
  case SET_POINT_CODE:
    return {
      ...state,
      code: action.code,
      isRelative: action.code === action.code.toLowerCase(),
      parameters: action.parameters,
    }

  case SET_POINT_X:
    return {
      ...state,
      x: action.x,
    }

  case SET_POINT_Y:
    return {
      ...state,
      y: action.y,
    }

  case SET_QUAD_X:
  case SET_QUAD_Y:
    return {
      ...state,
      parameters: Q(state.parameters, action),
    }

  default:
    return state
  }
}

export default function points(state = initialState, action) {
  switch (action.type) {
  case SET_POINT_CODE:
  case SET_POINT_X:
  case SET_POINT_Y:
  case SET_QUAD_X:
  case SET_QUAD_Y:
    return state.map((p) =>
      p.id === action.pointId ? point(p, action) : p)

  default:
    return state
  }
}
