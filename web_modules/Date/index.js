import React, { PropTypes } from "react"

const Date = ({ date }) => (
  <div>
    { date.toLocaleString() }
  </div>
)

Date.propTypes = {
  date: PropTypes.instanceOf(Date),
}

export default Date
