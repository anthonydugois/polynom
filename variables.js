const __PROD__ = process.argv.includes("--production")
const __DEV__ = !__PROD__

const variables = {
  __PROD__,
  __DEV__,
  __OUTPUT_DIR__: "dist",
  __SERVER_PROTOCOL__: "http://",
  __SERVER_HOST__: "localhost",
  __SERVER_PORT__: "1337",
}

variables.__SERVER_URL__ = `${variables.__SERVER_PROTOCOL__}${variables.__SERVER_HOST__}:${variables.__SERVER_PORT__}`

export default variables

export function defineVariables() {
  Object.keys(variables).forEach(k => global[k] = variables[k])
}
