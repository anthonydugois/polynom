export default (str) => {
  return str.toLowerCase()
    .replace(/[^\w ]+/g, "")
    .replace(/ +/g, "-")
}
