import { createSelector } from "reselect"

const pathsSelector = (state) => state.builder.paths
const pathsByIdSelector = (state) => state.pathsById

export const activePathsSelector = createSelector(
  pathsSelector,
  pathsByIdSelector,
  (paths, pathsById) => {
    const activePaths = paths.filter((id) => pathsById[id].isActive)

    return activePaths
  }
)
