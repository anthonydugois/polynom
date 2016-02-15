import { createSelector } from "reselect"

const gridSelector = (state) => state.grid

export const gridStepSelector = createSelector(
  gridSelector,
  (grid) => grid.snapToGrid ? grid.size : 1
)
