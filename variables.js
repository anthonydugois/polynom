process.env.NODE_ENV = "development"

if (process.argv.includes("--production")) {
  process.env.NODE_ENV = "production"
}

const __PROD__ = process.env.NODE_ENV === "production"
const __DEV__ = !__PROD__
const __OUTPUT_DIR__ = "dist"
const __SERVER_PROTOCOL__ = "http://"
const __SERVER_HOST__ = "localhost"
const __SERVER_PORT__ = "3000"

const variables = {
  __PROD__,
  __DEV__,
  __OUTPUT_DIR__,
  __SERVER_PROTOCOL__,
  __SERVER_HOST__,
  __SERVER_PORT__,
  __SERVER_URL__: `${ __SERVER_PROTOCOL__ }${ __SERVER_HOST__ }`,
}

if (__SERVER_PORT__) {
  variables.__SERVER_URL__ += `:${ __SERVER_PORT__ }`
}

export default variables

export function defineVariables() {
  Object.keys(variables).forEach((k) => global[k] = variables[k])
}
