import React, { Component, PropTypes } from "react"
import { DragLayer } from "react-dnd"
import SidebarPathExpand from "SidebarPath/SidebarPathExpand"

function getStyles(props) {
  const { item, currentOffset } = props

  if (!currentOffset) {
    return { display: "none" }
  }

  const { y } = currentOffset
  const { left, width } = item.boundingRect
  const transform = `translate(${ left }px, ${ y }px)`

  return {
    opacity: .6,
    width,
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
          <SidebarPathExpand>
            <div className="ad-SidebarPath-name">
              { item.path.name }
            </div>
          </SidebarPathExpand>
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
