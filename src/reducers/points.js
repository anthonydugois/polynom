import {
  SET_POINT_CODE,
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
  /*{
    id: 2,
    code: "T",
    x: 150,
    y: 150,
    isActive: false,
    isRelative: false,
    parameters: {},
  },*/
]

function M(state = {}, action) {
  switch (action.type) {
  default:
    return state
  }
}

function L(state = {}, action) {
  switch (action.type) {
  default:
    return state
  }
}

function Q(state = {
  x1: 0,
  y1: 0,
}, action) {
  switch (action.type) {
  default:
    return state
  }
}

function T(state = {}, action) {
  switch (action.type) {
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
  default:
    return state
  }
}

function S(state = {
  x2: 0,
  y2: 0,
}, action) {
  switch (action.type) {
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
  default:
    return state
  }
}

export function point(state = {
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
    }

  default:
    return state
  }
}

export default function points(state = initialState, action) {
  switch (action.type) {
  case SET_POINT_CODE:
    return state.map((p) =>
      p.id === action.pointId ? point(p, action) : p)

  default:
    return state
  }
}
