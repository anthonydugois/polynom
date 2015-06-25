import path from "path"
import webpack from "webpack"

export default {
    entry: {
        index: [
            "./src/index.js",
        ],
    },
    output: {
        path: path.join(__dirname, "dist"),
        filename: "bundle.js",
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                loaders: [
                    "babel?stage=0",
                    "eslint"
                ],
                exclude: /node_modules/,
            },
            {
                test: /\.css$/,
                loader: "style!css!cssnext",
            },
        ],
    }
}
