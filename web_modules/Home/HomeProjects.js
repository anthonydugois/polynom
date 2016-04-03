import React from "react"
import HomeProject from "./HomeProject"

function getKeysOrderedBy(obj, field, order = "asc") {
  return Object.keys(obj).sort((a, b) => order === "desc" ?
    obj[b][field] - obj[a][field] :
    obj[a][field] - obj[b][field])
}

const HomeProjects = ({ projectsById, ...props }) => (
  <div className="ad-HomeProjects">
    { getKeysOrderedBy(projectsById, "updatedAt", "desc").map((key) => (
      <HomeProject
        key={ key }
        project={ projectsById[key] }
        { ...props } />
    )) }
  </div>
)

export default HomeProjects
