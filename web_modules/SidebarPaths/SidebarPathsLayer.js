import React, { Component, PropTypes } from "react"
import { DragLayer } from "react-dnd"
import { ExpandCaption } from "Expand"

function getStyles(props) {
  const { item, currentOffset } = props

  if (!currentOffset) {
    return { display: "none" }
  }

  const { y } = currentOffset
  const { boundingRect } = item
  const transform = `translate(${ boundingRect.left + 20 }px, ${ y }px)`

  return {
    width: boundingRect.width,
    transform,
    WebkitTransform: transform,
  }
}

class SidebarPathsLayer extends Component {
  render() {
    const {
      item,
      isDragging,
    } = this.props

    return isDragging && (
      <div className="ad-SidebarPathsLayer">
        <div
          className="ad-SidebarPath"
          style={ getStyles(this.props) }>
          <ExpandCaption>
            <div className="ad-SidebarPath-caption">
              <div className="ad-SidebarPath-name">
                { item.path.name }
              </div>
            </div>
          </ExpandCaption>
        </div>
      </div>
    )
  }
}

SidebarPathsLayer.propTypes = {
  item: PropTypes.object,
  currentOffset: PropTypes.object,
  isDragging: PropTypes.bool,
}

export default DragLayer(
  (monitor) => ({
    item: monitor.getItem(),
    currentOffset: monitor.getSourceClientOffset(),
    isDragging: monitor.isDragging(),
  })
)(SidebarPathsLayer)
