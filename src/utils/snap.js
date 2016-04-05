export default ({ gridSnap, gridSize }) => (n) =>
  gridSnap ? gridSize * Math.round(n / gridSize) : n
