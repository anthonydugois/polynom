import React from "react"
import Router from "react-router"

import routes from "./routes"

Router.run(
    routes,
    __APP_HISTORY__ ? Router.HistoryLocation : Router.HashLocation,
    (Root) => React.render(<Root />, document.querySelector("#app"))
)
