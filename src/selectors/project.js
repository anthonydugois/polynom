import { createSelector } from "reselect"

const projectsByIdSelector = (state) => state.present.projectsById
const projectIdSelector = (_, props) => props.params.projectId

export const projectSelector = createSelector(
  projectsByIdSelector,
  projectIdSelector,
  (projectsById, projectId) => projectsById[projectId]
)
