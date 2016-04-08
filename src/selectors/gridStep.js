import { createSelector } from "reselect"

const settingsSelector = (state) => state.present.settings

export const gridStepSelector = createSelector(
  settingsSelector,
  (settings) => settings.gridSnap ? settings.gridSize : 1
)
