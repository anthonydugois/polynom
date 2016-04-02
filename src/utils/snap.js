export default (project) => (n) => project.gridSnap ?
  project.gridSize * Math.round(n / project.gridSize) : n
