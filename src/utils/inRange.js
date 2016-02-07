export default (n, max) => {
  if (isNaN(n) || n < 0) {
    return 0
  }

  if (n > max) {
    return max
  }

  return n
}
