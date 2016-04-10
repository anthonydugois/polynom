import React from "react"
import { Link } from "react-router"
import Container from "Container"
import Logo from "Logo"

const HomeHead = () => (
  <div className="ad-HomeHead">
    <Container className="ad-HomeHead-container">
      <Link to="/">
        <Logo size="3.3rem" />
      </Link>

      <div className="ad-HomeHead-brand">
        <h1 className="ad-HomeHead-title">
          Polynom
        </h1>
        <div className="ad-HomeHead-lead">
          Edit SVG paths easily directly in your browser.
        </div>
      </div>
    </Container>
  </div>
)

export default HomeHead
