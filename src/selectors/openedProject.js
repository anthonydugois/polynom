import { createSelector } from "reselect"

const projectsByIdSelector = (state) => state.projectsById

export const openedProjectSelector = createSelector(
  projectsByIdSelector,
  (projectsById) => Object.keys(projectsById).filter((key) =>
    projectsById[key].isOpened)[0],
)
