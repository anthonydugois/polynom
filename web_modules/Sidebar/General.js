import React from "react"

import Control from "Control"
import ButtonFile from "Button/ButtonFile"
import ButtonLink from "Button/ButtonLink"

import getPath, { exportSVG } from "../../src/utils/path"

import "./styles"

function General(props) {
  const {
    w,
    h,
    grid,
    paths,
    setWidth,
    setHeight,
    setGridSize,
    setGridSnap,
    setGridShow,
    importSVG,
  } = props

  return (
    <div className="ad-Settings">
      <div className="ad-Setting">
        <ButtonFile
          action="secondary"
          value="Import SVG"
          onChange={ importSVG } />

        <ButtonLink
          action="secondary"
          value="Export SVG"
          href={ exportSVG(w, h, paths) }
          download="paths.svg" />
      </div>

      <div className="ad-Setting">
        <Control
          label="Width"
          type="range"
          min={ 0 }
          max={ 1200 }
          step={ 50 }
          value={ w }
          onChange={ setWidth } />
      </div>

      <div className="ad-Setting">
        <Control
          label="Height"
          type="range"
          min={ 0 }
          max={ 1200 }
          step={ 50 }
          value={ h }
          onChange={ setHeight } />
      </div>

      <div className="ad-Setting">
        <Control
          label="Grid size"
          type="range"
          min={ 1 }
          max={ Math.min(w, h) / 2 }
          step={ 1 }
          value={ grid.size }
          onChange={ setGridSize } />
      </div>

      <div className="ad-Setting">
        <Control
          label="Snap grid"
          type="checkbox"
          checked={ grid.snap }
          onChange={ setGridSnap } />

        <Control
          label="Show grid"
          type="checkbox"
          checked={ grid.show }
          onChange={ setGridShow } />
      </div>
    </div>
  )
}

export default General
