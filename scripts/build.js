import webpack from "webpack"
import config from "../webpack.config"

import colors from "chalk"
import opn from "opn"
import server from "./server"
import { defineVariables } from "../variables"

defineVariables()

if (__PROD__) {
    webpack(config, (err) => {
        if (err) {
            throw err
        }

        console.log(colors.green("\nBuild successfully completed"))
    })
} else {
    server({
        __OUTPUT_DIR__,
        __SERVER_PORT__,
        __SERVER_HOST__,
    }, (err) => {
        if (err) {
            throw err
        }

        opn(__SERVER_URL__)

        console.log(colors.green(`\nServer started at ${__SERVER_URL__}`))
    })
}
