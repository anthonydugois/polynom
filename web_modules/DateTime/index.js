import React, { PropTypes } from "react"

const DateTime = ({
  datetime,
  format,
  formatOptions,
}) => (
  <time dateTime={ datetime.toISOString() }>
    { datetime.toLocaleDateString(format, formatOptions) }
  </time>
)

DateTime.defaultProps = {
  datetime: new Date(),
}

DateTime.propTypes = {
  datetime: PropTypes.instanceOf(Date),
  format: PropTypes.string,
  formatOptions: PropTypes.object,
}

export default DateTime
