import webpack from "webpack"
import config from "../webpack.config"

import server from "./webpack.server"

import colors from "chalk"

const DEV = process.argv.includes("--dev")

if (DEV) {
    server()
} else {
    webpack(config, (err) => {
        if (err) {
            throw err
        }

        console.log(colors.green(`\n✓ Build successfully completed`))
    })
}
