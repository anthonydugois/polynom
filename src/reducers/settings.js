import * as ActionTypes from "../constants/ActionTypes"
import * as VisibilityTypes from "../constants/VisibilityTypes"

const initialState = {
  gridShow: true,
  gridSnap: false,
  gridSize: 50,
  pointCodeShow: VisibilityTypes.ACTIVE,
  pathBoundingBoxShow: true,
  keyboardIncrement: 1,
}

export default (state = initialState, action) => {
  switch (action.type) {
  case ActionTypes.SET_GRID_SHOW:
    return {
      ...state,
      gridShow: action.gridShow,
    }

  case ActionTypes.SET_GRID_SNAP:
    return {
      ...state,
      gridSnap: action.gridSnap,
    }

  case ActionTypes.SET_GRID_SIZE:
    return {
      ...state,
      gridSize: action.gridSize,
    }

  case ActionTypes.SET_POINT_CODE_SHOW:
    return {
      ...state,
      pointCodeShow: action.pointCodeShow,
    }

  case ActionTypes.SET_PATH_BBOX_SHOW:
    return {
      ...state,
      pathBoundingBoxShow: action.pathBoundingBoxShow,
    }

  case ActionTypes.SET_KEYBOARD_INCREMENT:
    return {
      ...state,
      keyboardIncrement: action.keyboardIncrement,
    }

  default:
    return state
  }
}
