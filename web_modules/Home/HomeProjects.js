import React from "react"
import HomeProject from "./HomeProject"

const HomeProjects = ({ projectsById }) => (
  <div className="ad-HomeProjects">
    { Object.keys(projectsById).map((key) => (
      <HomeProject
        key={ key }
        project={ projectsById[key] } />
    )) }
  </div>
)

export default HomeProjects
