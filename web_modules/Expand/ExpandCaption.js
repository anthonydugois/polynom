import React, { PropTypes } from "react"

const ExpandCaption = ({
  _onClick,
  _isOpened,
  children,
  ...props,
}) => (
  <div { ...props }>
    { React.Children.map(children, (child) => React.cloneElement(child, {
      _onClick,
      _isOpened,
      ...child.props,
    })) }
  </div>
)

ExpandCaption.propTypes = {
  _onClick: PropTypes.func,
  _isOpened: PropTypes.bool,
  children: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.element,
    PropTypes.string,
  ]),
}

export default ExpandCaption
