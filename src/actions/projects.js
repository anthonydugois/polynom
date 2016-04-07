import * as ActionTypes from "../constants/ActionTypes"
import Snap from "snapsvg"
import { importPath, deletePaths } from "./paths"

const savedState = JSON.parse(localStorage.getItem("savedState"))
let newProjectId = 0

if (savedState && Object.keys(savedState.projectsById).length > 0) {
  newProjectId = Math.max(...Object.keys(savedState.projectsById))
}

export function addProject(name, width, height) {
  return {
    type: ActionTypes.ADD_PROJECT,
    projectId: ++newProjectId,
    name,
    width,
    height,
  }
}

export function importProject(file) {
  return (dispatch, getState) => {
    const fileName = file.name.split(".")
    const ext = fileName.pop().toLowerCase().trim()
    const name = fileName.join(".")

    if (ext === "svg") {
      const reader = new FileReader()

      reader.onload = (f) => {
        let svg = Snap(Snap.parse(f.target.result).node)

        if (svg.type !== "svg") {
          svg = svg.select("svg")
        }

        const { width, height } = svg.attr("viewBox")
        const paths = svg.selectAll("path")

        dispatch(addProject(name, width, height))

        paths.forEach((path, index) => dispatch(importPath(
          newProjectId,
          index,
          path.attr("d")
        )))
      }

      reader.readAsBinaryString(file)
    }
  }
}

export function deleteProject(projectId) {
  return (dispatch, getState) => {
    const { paths } = getState().present.projectsById[projectId]

    dispatch(deletePaths(paths))
    dispatch({
      type: ActionTypes.DELETE_PROJECT,
      projectId,
    })
  }
}

export function update(projectId) {
  return {
    type: ActionTypes.UPDATE_PROJECT,
    projectId,
  }
}

export function setName(projectId, name) {
  return {
    type: ActionTypes.SET_PROJECT_NAME,
    projectId,
    name,
  }
}

export function setWidth(projectId, width) {
  return {
    type: ActionTypes.SET_PROJECT_WIDTH,
    projectId,
    width,
  }
}

export function setHeight(projectId, height) {
  return {
    type: ActionTypes.SET_PROJECT_HEIGHT,
    projectId,
    height,
  }
}

export function setGridShow(projectId, gridShow) {
  return {
    type: ActionTypes.SET_GRID_SHOW,
    projectId,
    gridShow,
  }
}

export function setGridSnap(projectId, gridSnap) {
  return {
    type: ActionTypes.SET_GRID_SNAP,
    projectId,
    gridSnap,
  }
}

export function setGridSize(projectId, gridSize) {
  return {
    type: ActionTypes.SET_GRID_SIZE,
    projectId,
    gridSize,
  }
}

export function setPointCodeShow(projectId, pointCodeShow) {
  return {
    type: ActionTypes.SET_POINT_CODE_SHOW,
    projectId,
    pointCodeShow,
  }
}

export function setPathBboxShow(projectId, pathBoundingBoxShow) {
  return {
    type: ActionTypes.SET_PATH_BBOX_SHOW,
    projectId,
    pathBoundingBoxShow,
  }
}

export function setKeyboardIncrement(projectId, keyboardIncrement) {
  return {
    type: ActionTypes.SET_KEYBOARD_INCREMENT,
    projectId,
    keyboardIncrement,
  }
}
