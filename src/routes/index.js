import React from "react"
import { Route, IndexRoute } from "react-router"
import App from "App"
import Home from "Home"
import Project from "Project"

const routes = (
  <Route path="/polynom/" component={ App }>
    <IndexRoute component={ Home } />
    <Route path="projects/:projectId" component={ Project } />
  </Route>
)

export default routes
