import React, { PropTypes } from "react"

const DateTime = ({ datetime }) => (
  <time dateTime={ datetime.toISOString() }>
    { datetime.toLocaleDateString() }
  </time>
)

DateTime.propTypes = {
  datetime: PropTypes.instanceOf(Date),
}

export default DateTime
