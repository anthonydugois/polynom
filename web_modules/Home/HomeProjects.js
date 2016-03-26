import React from "react"
import HomeProject from "./HomeProject"

const HomeProjects = ({
  projectsById,
  pathsById,
  pointsById,
}) => (
  <div className="ad-HomeProjects">
    { Object.keys(projectsById).map((key) => (
      <HomeProject
        key={ key }
        project={ projectsById[key] }
        pathsById={ pathsById }
        pointsById={ pointsById } />
    )) }
  </div>
)

export default HomeProjects
