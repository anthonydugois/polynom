import * as ActionTypes from "../constants/ActionTypes"

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
  case ActionTypes.SET_QUAD_X1:
    return {
      ...state,
      x1: action.x1,
    }

  case ActionTypes.SET_QUAD_Y1:
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
  case ActionTypes.SET_CUB_X1:
    return {
      ...state,
      x1: action.x1,
    }

  case ActionTypes.SET_CUB_Y1:
    return {
      ...state,
      y1: action.y1,
    }

  case ActionTypes.SET_CUB_X2:
    return {
      ...state,
      x2: action.x2,
    }

  case ActionTypes.SET_CUB_Y2:
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
  case ActionTypes.SET_SMOOTH_X2:
    return {
      ...state,
      x2: action.x2,
    }

  case ActionTypes.SET_SMOOTH_Y2:
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
  case ActionTypes.SET_ARC_RX:
    return {
      ...state,
      rx: action.rx,
    }

  case ActionTypes.SET_ARC_RY:
    return {
      ...state,
      ry: action.ry,
    }

  case ActionTypes.SET_ARC_ROT:
    return {
      ...state,
      xAxisRotation: action.xAxisRotation,
    }

  case ActionTypes.SET_ARC_LARGE:
    return {
      ...state,
      largeArc: action.largeArc,
    }

  case ActionTypes.SET_ARC_SWEEP:
    return {
      ...state,
      sweep: action.sweep,
    }

  default:
    return state
  }
}

function point(state = initialState[0], action) {
  switch (action.type) {

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
   * Default position
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
   * Quadratic curve anchor position
   */
  case ActionTypes.SET_QUAD_X1:
  case ActionTypes.SET_QUAD_Y1:
    return {
      ...state,
      parameters: Q(state.parameters, action),
    }

  /**
   * Cubic curve anchors positions
   */
  case ActionTypes.SET_CUB_X1:
  case ActionTypes.SET_CUB_Y1:
  case ActionTypes.SET_CUB_X2:
  case ActionTypes.SET_CUB_Y2:
    return {
      ...state,
      parameters: C(state.parameters, action),
    }

  /**
   * Smooth cubic curve anchor position
   */
  case ActionTypes.SET_SMOOTH_X2:
  case ActionTypes.SET_SMOOTH_Y2:
    return {
      ...state,
      parameters: S(state.parameters, action),
    }

  /**
   * Arc parameters
   */
  case ActionTypes.SET_ARC_RX:
  case ActionTypes.SET_ARC_RY:
  case ActionTypes.SET_ARC_ROT:
  case ActionTypes.SET_ARC_LARGE:
  case ActionTypes.SET_ARC_SWEEP:
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

  /**
   * Insert a point just after the active one
   */
  case ActionTypes.ADD_POINT:
    return state.reduce((acc, point) => {
      if (point.isActive) {
        return [
          ...acc,
          {
            ...point,
            isActive: false,
          },
          {
            id: Math.max(...state.map(({ id }) => id)) + 1,
            code: "L",
            x: action.x,
            y: action.y,
            isActive: true,
            isRelative: false,
            parameters: {},
          },
        ]
      }

      return [...acc, point]
    }, [])

  /**
   * Remove a point
   */
  case ActionTypes.REMOVE_POINT:
    return state.filter((p) => p.id !== action.pointId)

  /**
   * Make a point active; only one point at a time can be in this state
   */
  case ActionTypes.SET_ACTIVE_POINT:
    return state.map((p) => ({
      ...p,
      isActive: p.id === action.pointId,
    }))

  case ActionTypes.SET_POINT_CODE:
  case ActionTypes.SET_POINT_X:
  case ActionTypes.SET_POINT_Y:
  case ActionTypes.SET_QUAD_X1:
  case ActionTypes.SET_QUAD_Y1:
  case ActionTypes.SET_CUB_X1:
  case ActionTypes.SET_CUB_Y1:
  case ActionTypes.SET_CUB_X2:
  case ActionTypes.SET_CUB_Y2:
  case ActionTypes.SET_SMOOTH_X2:
  case ActionTypes.SET_SMOOTH_Y2:
  case ActionTypes.SET_ARC_RX:
  case ActionTypes.SET_ARC_RY:
  case ActionTypes.SET_ARC_ROT:
  case ActionTypes.SET_ARC_LARGE:
  case ActionTypes.SET_ARC_SWEEP:
    return state.map((p) =>
      p.id === action.pointId ? point(p, action) : p)

  default:
    return state
  }
}
