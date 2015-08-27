import React from "react"
import {
    Route,
    DefaultRoute,
    NotFoundRoute,
    Redirect,
} from "react-router"

import App from "App"

const routes = (
    <Route handler={App} />
)

export default routes
