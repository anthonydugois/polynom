if (__PROD__) {
  module.exports = require("./store.prod")
} else {
  module.exports = require("./store.dev")
}
