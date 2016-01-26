import { createSelector } from "reselect"
import { activePathsSelector } from "./activePaths"

const pathsByIdSelector = (state) => state.pathsById
const pointsByIdSelector = (state) => state.pointsById

export const activePointsSelector = createSelector(
  pathsByIdSelector,
  pointsByIdSelector,
  activePathsSelector,
  (pathsById, pointsById, activePaths) => {
    const activePoints = activePaths.reduce((acc, key) => {
      return [
        ...acc,
        ...pathsById[key].points.filter((id) => pointsById[id].isActive),
      ]
    }, [])

    return activePoints
  }
)

export const pointSelector = createSelector(
  pointsByIdSelector,
  activePointsSelector,
  (pointsById, activePoints) => {
    if (activePoints.length === 1) {
      return pointsById[activePoints[0]]
    }
  }
)

export const previousPointSelector = createSelector(
  pathsByIdSelector,
  pointsByIdSelector,
  activePathsSelector,
  pointSelector,
  (pathsById, pointsById, activePaths, point) => {
    if (point) {
      return activePaths.reduce((acc, id) => {
        const { points } = pathsById[id]
        const index = points.indexOf(point.id)

        return index > 0 ? pointsById[points[index - 1]] : acc
      }, null)
    }
  }
)
