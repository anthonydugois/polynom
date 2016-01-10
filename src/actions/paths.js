import * as types from "../constants/ActionTypes"

export function getPathById(paths, id) {
  const index = paths.map((path) => path.id).indexOf(id)

  return {
    index,
    path: paths[index],
  }
}

export function addPath(x, y) {
  return (dispatch, getState) => {
    dispatch({
      type: types.ADD_PATH,
      x,
      y,
    })

    const { paths } = getState()

    dispatch(setActivePath(paths[paths.length - 1].id))
  }
}

export function removePath(id) {
  return (dispatch, getState) => {
    const { paths } = getState()
    const { index, path } = getPathById(paths, id)

    if (paths.length > 1) {
      if (path.isActive) {
        const activeId = index === 0 ?
          paths[index + 1].id : paths[index - 1].id

        dispatch(setActivePath(activeId))
      }

      dispatch({
        type: types.REMOVE_PATH,
        id,
      })
    }
  }
}

export function setActivePath(id) {
  return {
    type: types.SET_ACTIVE_PATH,
    id,
  }
}

export function setRelative(id, isRelative) {
  return {
    type: types.SET_RELATIVE,
    id,
    isRelative,
  }
}

export function setClosed(id, isClosed) {
  return {
    type: types.SET_CLOSED,
    id,
    isClosed,
  }
}

export function setFilled(id, isFilled) {
  return {
    type: types.SET_FILLED,
    id,
    isFilled,
  }
}
