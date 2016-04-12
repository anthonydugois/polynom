import { createSelector } from "reselect"
import { projectSelector } from "./project"

const pathsByIdSelector = (state) => state.present.pathsById

export const activePathsSelector = createSelector(
  projectSelector,
  pathsByIdSelector,
  (project, pathsById) => project.paths.filter((id) => pathsById[id].isActive)
)
