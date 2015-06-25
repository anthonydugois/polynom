import webpack from "webpack"
import webpackDevServer from "webpack-dev-server"

import config from "../webpack.config"

import colors from "chalk"

export default (options) => {
    options = {
        protocol: "http://",
        host: "localhost",
        port: 1337,
        ...(options || {}),
    }

    const url = `${options.protocol}${options.host}:${options.port}`

    const devEntries = [
        `webpack/hot/only-dev-server`,
    ]

    const devConfig = {
        ...config,
        debug: true,
        watch: true,
        colors: true,
        progress: true,
        entry: {
            ...Object.keys(config.entry).reduce((obj, key) => {
                obj[key] = [
                    ...devEntries,
                    ...config.entry[key],
                ]

                return obj
            }, {}),
        },
        plugins: [
            ...(config.plugins || []),
            new webpack.NoErrorsPlugin(),
            new webpack.HotModuleReplacementPlugin(),
        ],
        eslint: {
            configFile: "./.eslintrc",
            emitError: true,
            emitWarning: true,
        }
    }

    return new webpackDevServer(webpack(devConfig), {
        https: options.protocol === "https://",
        hot: true,
        historyApiFallback: true,
        stats: {
            colors: true
        },
        noInfo: true,
    }).listen(options.port, options.host, (err) => {
        if (err) {
            throw err
        }

        console.log(colors.green(`\n✓ Dev server started on ${url}`))
    })
}
