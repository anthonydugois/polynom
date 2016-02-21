import React from "react"
import { Route, IndexRoute } from "react-router"
import App from "App"
import Projects from "Projects"
import Project from "Projects/Project"

const routes = (
  <Route path="/" component={ App }>
    <IndexRoute component={ Projects } />
    <Route path="projects/:projectId" component={ Project } />
  </Route>
)

export default routes
