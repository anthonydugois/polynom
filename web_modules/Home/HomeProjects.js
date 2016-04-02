import React from "react"
import HomeProject from "./HomeProject"

function getKeysOrderedBy(obj, field, order = "asc") {
  return Object.keys(obj).sort((a, b) => {
    if (order === "desc") {
      return obj[b][field] - obj[a][field]
    }

    return obj[a][field] - obj[b][field]
  })
}

const HomeProjects = ({ projectsById, ...props }) => (
  <div className="ad-HomeProjects">
    { getKeysOrderedBy(projectsById, "createdAt", "desc").map((key) => (
      <HomeProject
        key={ key }
        project={ projectsById[key] }
        { ...props } />
    )) }
  </div>
)

export default HomeProjects
