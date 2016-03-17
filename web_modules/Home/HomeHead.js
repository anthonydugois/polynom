import React from "react"
import { Link } from "react-router"
import Icon from "Icon"

const HomeHead = () => (
  <div className="ad-HomeHead">
    <Link
      to="/"
      className="ad-Brand">
      <Icon name="polynom" />
      <span className="ad-Brand-name">Polynom</span>
    </Link>
    <div className="ad-HomeHead-lead">
      Create and edit SVG paths easily directly in your browser.
    </div>
  </div>
)

export default HomeHead
