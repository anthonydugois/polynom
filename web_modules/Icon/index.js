import "./styles"

import React, { PropTypes } from "react"

function getIcon(name) {
  switch (name) {
  case "right":
    return `M366 698l196-196-196-196 60-60 256 256-256 256z`

  case "down":
    return `M316 334l196 196 196-196 60 60-256 256-256-256z`

  case "add":
    return `M810 554h-256v256h-84v-256h-256v-84h256v-256h84v256h256v84z`

  case "close":
    return `M810 274l-238 238 238 238-60 60-238-238-238 238-60-60
      238-238-238-238 60-60 238 238 238-238z`

  case "delete":
    return `M810 170v86h-596v-86h148l44-42h212l44 42h148zM256
      810v-512h512v512q0 34-26 60t-60 26h-340q-34 0-60-26t-26-60z`

  case "edit":
    return `M884 300l-78 78-160-160 78-78q12-12 30-12t30 12l100 100q12
      12 12 30t-12 30zM128 736l472-472 160 160-472 472h-160v-160z`

  case "paths":
    return `M592 792q28 0 56-37t36-113q-60 16-92 54t-32 64q0 14 10 23t22 9zM196
      294l-74-72q20-24 36-40 54-54 116-54 38 0 73 30t35 92q0 60-56 140-56 78-78
      150-12 34-7 58t21 24q18 0 48-36 44-44 98-116 96-120 210-120 84 0 125 55t47
      123h106v106h-104q-12 138-74 200t-128 62q-56 0-96-39t-40-93q0-66
      60-138t170-92q-2-16-3-22t-6-19-12-19-21-11-34-5q-56 0-174 146-34 42-47
      57t-37 35-46 26q-70 22-120-26t-50-120q0-30 11-66t29-70 34-61 31-49
      17-24q34-56 12-64-14-6-72 52z`

  case "point":
    return `M640 384v-256h86v86h170v84h-170v86h-86zM896 554h-426v-84h426v84z
      M298 384h86v256h-86v-86h-170v-84h170v-86zM554 896h-84v-256h84v86h342v84
      h-342v86zM128 214h426v84h-426v-84zM128 726h256v84h-256v-84z`

  case "settings":
    return `M640 384v-256h86v86h170v84h-170v86h-86zM896 554h-426v-84h426v84z
      M298 384h86v256h-86v-86h-170v-84h170v-86zM554 896h-84v-256h84v86h342v84
      h-342v86zM128 214h426v84h-426v-84zM128 726h256v84h-256v-84z`

  case "reorder":
    return `M170 640v-86h684v86h-684zM854 384v86h-684v-86h684z`

  default:
    return ""
  }
}

const Icon = ({ name }) => (
  <svg
    className="ad-Icon"
    viewBox="0 0 1024 1024">
    <path d={ getIcon(name) } />
  </svg>
)

Icon.propTypes = {
  name: PropTypes.string.isRequired,
}

export default Icon
