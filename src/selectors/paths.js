import { createSelector } from "reselect"

const pathsSelector = (state) => state.paths.paths
const pathsByIdSelector = (state) => state.paths.pathsById

export const activePathSelector = createSelector(
  pathsSelector,
  pathsByIdSelector,
  (paths, pathsById) => {
    const activePathId = paths.filter((id) => pathsById[id].isActive)[0]
    const activePath = pathsById[activePathId]

    return {
      paths,
      pathsById,
      activePath,
    }
  }
)
