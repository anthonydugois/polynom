import { createSelector } from "reselect"
import { activePathSelector } from "./paths"

const pointsSelector = (state) => state.points

export const activePointSelector = createSelector(
  pointsSelector,
  activePathSelector,
  (points, { activePath }) => {
    const pointId = activePath.points.filter((id) => points[id].isActive)[0]
    const index = activePath.points.indexOf(pointId)
    const point = points[pointId]
    const previousPoint = index > 0 ? points[activePath.points[index - 1]] : {}

    return {
      activePath,
      point,
      previousPoint,
    }
  }
)
