import "./styles"

import React from "react"
import HomeHead from "./HomeHead"
import HomeBody from "./HomeBody"

const Home = (props) => (
  <div className="ad-Home">
    <HomeHead />
    <HomeBody { ...props } />
  </div>
)

export default Home
