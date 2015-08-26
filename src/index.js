import React from "react"
import Router, {RouteHandler} from "react-router"

import routes from "./routes"

Router.run(routes, Router.HistoryLocation, (Handler) => {
    React.render(
        <Handler RouteHandler={RouteHandler} />,
        document.querySelector(__APP__)
    )
})
