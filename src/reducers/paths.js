import points from "./points"
import {
  ADD_PATH,
  REMOVE_PATH,
  SET_ACTIVE_PATH,
  SET_RELATIVE,
  SET_CLOSED,
  SET_FILLED,
  SET_POINT_CODE,
} from "../constants/ActionTypes"

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
  /*{
    id: 1,
    name: "Second Path",
    isActive: false,
    isClosed: false,
    isRelative: false,
    isFilled: false,
    points: points(undefined, { type: null }),
  },*/
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
  case SET_RELATIVE:
    return {
      ...state,
      isRelative: action.isRelative,
    }

  case SET_CLOSED:
    return {
      ...state,
      isClosed: action.isClosed,
    }

  case SET_FILLED:
    return {
      ...state,
      isFilled: action.isFilled,
    }

  case SET_POINT_CODE:
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
  case REMOVE_PATH:
    return state.reduce((acc, p) =>
      p.id !== action.id ? [...acc, p] : acc, [])

  case SET_ACTIVE_PATH:
    return state.map((p) => ({
      ...p,
      isActive: p.id === action.id,
    }))

  case SET_RELATIVE:
  case SET_CLOSED:
  case SET_FILLED:
  case SET_POINT_CODE:
    return state.map((p) =>
      p.id === action.id ? path(p, action) : p)

  default:
    return state
  }
}
