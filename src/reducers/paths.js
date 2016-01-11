import * as ActionTypes from "../constants/ActionTypes"
import points from "./points"

const initialState = [
  {
    id: 0,
    name: "First Path",
    isActive: true,
    isClosed: false,
    isRelative: false,
    isFilled: false,
    points: points(undefined, { type: null }),
  },
]

function path(state = {
  id: 0,
  name: "",
  isActive: false,
  isClosed: false,
  isRelative: false,
  isFilled: false,
  points: [],
}, action) {
  switch (action.type) {
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

  case ActionTypes.ADD_POINT:
  case ActionTypes.REMOVE_POINT:
  case ActionTypes.SET_ACTIVE_POINT:
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
    return {
      ...state,
      points: points(state.points, action),
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
    return state.reduce((acc, path) => {
      if (path.isActive) {
        return [
          ...acc,
          {
            ...path,
            isActive: false,
          },
          {
            id: Math.max(...state.map(({ id }) => id)) + 1,
            name: `Path ${ state.length }`,
            isActive: true,
            isClosed: false,
            isRelative: false,
            isFilled: false,
            points: [
              {
                id: 0,
                code: "M",
                x: action.x,
                y: action.y,
                isActive: true,
                isRelative: false,
                parameters: {},
              },
            ],
          },
        ]
      }

      return [...acc, path]
    }, [])

  case ActionTypes.REMOVE_PATH:
    return state.filter((p) => p.id !== action.id)

  case ActionTypes.SET_ACTIVE_PATH:
    return state.map((p) => ({
      ...p,
      isActive: p.id === action.id,
    }))

  case ActionTypes.SET_RELATIVE:
  case ActionTypes.SET_CLOSED:
  case ActionTypes.SET_FILLED:
  case ActionTypes.ADD_POINT:
  case ActionTypes.REMOVE_POINT:
  case ActionTypes.SET_ACTIVE_POINT:
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
      p.id === action.id ? path(p, action) : p)

  default:
    return state
  }
}
