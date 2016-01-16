if (__PROD__) {
  module.exports = require("./prod")
} else {
  module.exports = require("./dev")
}
