import React from "react"
import HomeProject from "./HomeProject"

const HomeProjects = ({ projectsById, ...props }) => (
  <div className="ad-HomeProjects">
    { Object.keys(projectsById).map((key) => (
      <HomeProject
        key={ key }
        project={ projectsById[key] }
        { ...props } />
    )) }
  </div>
)

export default HomeProjects
