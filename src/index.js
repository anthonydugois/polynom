import React from "react"
import ReactDOM from "react-dom"
import Router from "react-router"

import routes from "./routes"

Router.run(
    routes,
    __APP_HISTORY__ ? Router.HistoryLocation : Router.HashLocation,
    (Root) => ReactDOM.render(<Root />, document.querySelector("#app"))
)
