import * as ActionTypes from "../constants/ActionTypes"

export function openProject(projectId) {
  return {
    type: ActionTypes.OPEN_PROJECT,
    projectId,
  }
}

export function closeProjects() {
  return {
    type: ActionTypes.CLOSE_PROJECTS,
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
