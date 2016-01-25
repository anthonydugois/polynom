import { createSelector } from "reselect"

const pathsSelector = (state) => state.builder.paths
const pathsByIdSelector = (state) => state.pathsById
const pointsByIdSelector = (state) => state.pointsById

export const activePointsSelector = createSelector(
  pathsSelector,
  pathsByIdSelector,
  pointsByIdSelector,
  (paths, pathsById, pointsById) => {
    const activePoints = null

    return activePoints
  }
)
