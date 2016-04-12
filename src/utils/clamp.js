export default (n, min, max) => Math.min(Math.max(isNaN(n) ? min : n, min), max)
