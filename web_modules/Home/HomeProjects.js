import React from "react"
import HomeProject from "./HomeProject"

function orderProjects(obj) {
  return Object.keys(obj).sort((a, b) =>
    (new Date(obj[b].updatedAt)) - (new Date(obj[a].updatedAt)))
}

const HomeProjects = ({ projectsById, ...props }) => (
  <div className="ad-HomeProjects">
    { orderProjects(projectsById).map((key) => (
      <HomeProject
        key={ key }
        project={ projectsById[key] }
        { ...props } />
    )) }
  </div>
)

export default HomeProjects
