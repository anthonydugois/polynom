import {
  ADD_POINT,
  REMOVE_POINT,
  SET_ACTIVE_POINT,
  SET_POINT_CODE,
  SET_POINT_X,
  SET_POINT_Y,
  SET_QUAD_X1,
  SET_QUAD_Y1,
  SET_CUB_X1,
  SET_CUB_Y1,
  SET_CUB_X2,
  SET_CUB_Y2,
  SET_SMOOTH_X2,
  SET_SMOOTH_Y2,
  SET_ARC_RX,
  SET_ARC_RY,
  SET_ARC_ROT,
  SET_ARC_LARGE,
  SET_ARC_SWEEP,
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
  case SET_QUAD_X1:
    return {
      ...state,
      x1: action.x1,
    }

  case SET_QUAD_Y1:
    return {
      ...state,
      y1: action.y1,
    }

  default:
    return state
  }
}

function C(state = {
  x1: 0,
  y1: 0,
  x2: 0,
  y2: 0,
}, action) {
  switch (action.type) {
  case SET_CUB_X1:
    return {
      ...state,
      x1: action.x1,
    }

  case SET_CUB_Y1:
    return {
      ...state,
      y1: action.y1,
    }

  case SET_CUB_X2:
    return {
      ...state,
      x2: action.x2,
    }

  case SET_CUB_Y2:
    return {
      ...state,
      y2: action.y2,
    }

  default:
    return state
  }
}

function S(state = {
  x2: 0,
  y2: 0,
}, action) {
  switch (action.type) {
  case SET_SMOOTH_X2:
    return {
      ...state,
      x2: action.x2,
    }

  case SET_SMOOTH_Y2:
    return {
      ...state,
      y2: action.y2,
    }

  default:
    return state
  }
}

function A(state = {
  rx: 0,
  ry: 0,
  xAxisRotation: 0,
  largeArc: false,
  sweep: false,
}, action) {
  switch (action.type) {
  case SET_ARC_RX:
    return {
      ...state,
      rx: action.rx,
    }

  case SET_ARC_RY:
    return {
      ...state,
      ry: action.ry,
    }

  case SET_ARC_ROT:
    return {
      ...state,
      xAxisRotation: action.xAxisRotation,
    }

  case SET_ARC_LARGE:
    return {
      ...state,
      largeArc: action.largeArc,
    }

  case SET_ARC_SWEEP:
    return {
      ...state,
      sweep: action.sweep,
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

  case SET_QUAD_X1:
  case SET_QUAD_Y1:
    return {
      ...state,
      parameters: Q(state.parameters, action),
    }

  case SET_CUB_X1:
  case SET_CUB_Y1:
  case SET_CUB_X2:
  case SET_CUB_Y2:
    return {
      ...state,
      parameters: C(state.parameters, action),
    }

  case SET_SMOOTH_X2:
  case SET_SMOOTH_Y2:
    return {
      ...state,
      parameters: S(state.parameters, action),
    }

  case SET_ARC_RX:
  case SET_ARC_RY:
  case SET_ARC_ROT:
  case SET_ARC_LARGE:
  case SET_ARC_SWEEP:
    return {
      ...state,
      parameters: A(state.parameters, action),
    }

  default:
    return state
  }
}

export default function points(state = initialState, action) {
  switch (action.type) {
  case ADD_POINT:
    return [
      ...state,
      {
        id: state.length,
        code: "L",
        x: action.x,
        y: action.y,
        isActive: false,
        isRelative: false,
        parameters: {},
      },
    ]

  case REMOVE_POINT:
    return state.reduce((acc, p) =>
      p.id !== action.pointId ? [...acc, p] : acc, [])

  case SET_ACTIVE_POINT:
    return state.map((p) => ({
      ...p,
      isActive: p.id === action.pointId,
    }))

  case SET_POINT_CODE:
  case SET_POINT_X:
  case SET_POINT_Y:
  case SET_QUAD_X1:
  case SET_QUAD_Y1:
  case SET_CUB_X1:
  case SET_CUB_Y1:
  case SET_CUB_X2:
  case SET_CUB_Y2:
  case SET_SMOOTH_X2:
  case SET_SMOOTH_Y2:
  case SET_ARC_RX:
  case SET_ARC_RY:
  case SET_ARC_ROT:
  case SET_ARC_LARGE:
  case SET_ARC_SWEEP:
    return state.map((p) =>
      p.id === action.pointId ? point(p, action) : p)

  default:
    return state
  }
}
