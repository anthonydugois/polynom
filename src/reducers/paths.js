import {
  ADD_PATH,
} from "../constants/ActionTypes"

const initialState = [
  {
    id: 0,
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
          code: "L",
          x: 100,
          y: 100,
        },
      },
    ],
  },
]

function M(state = {
  code: "M",
  relative: false,
  x: 0,
  y: 0,
}, action) {
  switch (action.type) {
  default:
    return state
  }
}

function L(state = {
  code: "L",
  relative: false,
  x: 0,
  y: 0,
}, action) {
  switch (action.type) {
  default:
    return state
  }
}

function A(state = {
  code: "A",
  relative: false,
  x: 0,
  y: 0,
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

function point(state = {
  id: 0,
  isActive: false,
  parameters: {},
}, action) {
  switch (action.type) {
  default:
    return state
  }
}

function path(state = {
  id: 0,
  isActive: false,
  isClosed: false,
  isRelative: false,
  isFilled: false,
  points: [],
}, action) {
  switch (action.type) {
  default:
    return state
  }
}

export default function paths(state = initialState, action) {
  switch (action.type) {
  default:
    return state
  }
}
