import React from "react"
import { Router, Route } from "react-router"
import { createHistory, useBasename } from "history"

import App from "App"

const history = useBasename(createHistory)({ basename: "/" })

const routes = (
  <Router history={ history }>
    <Route
      path="/"
      component={ App } />
  </Router>
)

export default routes
