export default (n, min, max) => {
  return Math.min(Math.max(isNaN(n) ? min : n, min), max)
}
