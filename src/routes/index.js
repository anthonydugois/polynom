import React from "react"
import { Router, Route, browserHistory } from "react-router"
import App from "App"

const routes = (
  <Router history={ browserHistory }>
    <Route path="/" component={ App } />
  </Router>
)

export default routes
