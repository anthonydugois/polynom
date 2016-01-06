import {
  ADD_PATH,
} from "../constants/ActionTypes"

const initialState = [
  {},
]

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
