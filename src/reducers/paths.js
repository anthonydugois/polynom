import {
  ADD_PATH,
  SET_ACTIVE_PATH,
  SET_RELATIVE,
  SET_CLOSED,
  SET_FILLED,
} from "../constants/ActionTypes"

const initialState = [
  {
    id: 0,
    name: "First Path",
    isActive: true,
    isClosed: false,
    isRelative: false,
    isFilled: false,
    points: [
      {
        id: 0,
        isActive: false,
        isRelative: false,
        parameters: {
          code: "M",
          x: 50,
          y: 50,
        },
      },
      {
        id: 1,
        isActive: true,
        isRelative: false,
        parameters: {
          code: "Q",
          x: 100,
          y: 100,
          x1: 150,
          y1: 75,
        },
      },
      {
        id: 2,
        isActive: false,
        isRelative: false,
        parameters: {
          code: "T",
          x: 150,
          y: 150,
        },
      },
    ],
  },
  {
    id: 1,
    name: "First Path",
    isActive: false,
    isClosed: false,
    isRelative: false,
    isFilled: false,
    points: [
      {
        id: 0,
        isActive: false,
        isRelative: false,
        parameters: {
          code: "M",
          x: 50,
          y: 50,
        },
      },
      {
        id: 1,
        isActive: true,
        isRelative: false,
        parameters: {
          code: "Q",
          x: 100,
          y: 100,
          x1: 150,
          y1: 75,
        },
      },
      {
        id: 2,
        isActive: false,
        isRelative: false,
        parameters: {
          code: "T",
          x: 150,
          y: 150,
        },
      },
    ],
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

  default:
    return state
  }
}

export default function paths(state = initialState, action) {
  switch (action.type) {
  case SET_ACTIVE_PATH:
    return state.map((p) => ({
      ...p,
      isActive: p.id === action.id,
    }))

  case SET_RELATIVE:
  case SET_CLOSED:
  case SET_FILLED:
    return state.map((p) => p.id === action.id ? path(p, action) : p)

  default:
    return state
  }
}
