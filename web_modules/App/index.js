import React, { Component } from "react"

import Builder from "Builder"

import "./styles"

class App extends Component {
    render() {
        return (
            <div className="ad-App">
                <Builder
                    initialClosePath={ false }
                    initialPoints={ [
                        {
                            x: 500,
                            y: 400,
                        },
                        {
                            x: 600,
                            y: 400,
                        },
                    ] } />
            </div>
        )
    }
}

export default App
