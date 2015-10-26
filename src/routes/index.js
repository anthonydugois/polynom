import React from "react"
import { Router, Route } from "react-router"
import createBrowserHistory from "history/lib/createBrowserHistory"

import App from "App"

const base = "/svg-path-builder/"

const routes = (
    <Router history={ createBrowserHistory() }>
        <Route
            path={ base }
            component={ App } />
    </Router>
)

export default routes
