import React, { Component } from "react"
import Overview from "Overview"
import Sidebar from "Sidebar"
import "./styles"

class App extends Component {
  render() {
    return (
      <div className="ad-App">
        <Sidebar />
        <Overview />
      </div>
    )
  }
}

export default App
