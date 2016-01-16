if (__PROD__) {
  module.export = require("./prod")
} else {
  module.export = require("./dev")
}
