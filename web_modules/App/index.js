import React, { Component } from "react"

import Builder from "Builder"

import "./styles"

class App extends Component {
    render() {
        return (
            <div className="ad-App">
                <Builder
                    initialClosePath={ false }
                    initialRelativePoints={ true }
                    initialPoints={ [
                        {
                            x: 200,
                            y: 400,
                        },
                        {
                            x: 300,
                            y: 400,
                        },
                        {
                            x: 400,
                            y: 400,
                            quadratic: {
                                t: false,
                                x: 350,
                                y: 150,
                            },
                        },
                        {
                            x: 500,
                            y: 400,
                            quadratic: {
                                t: true,
                                x: 350,
                                y: 150,
                            },
                        },
                        {
                            x: 600,
                            y: 400,
                            cubic: {
                                s: false,
                                x1: 550,
                                y1: 150,
                                x2: 550,
                                y2: 650,
                            },
                        },
                        {
                            x: 700,
                            y: 400,
                            cubic: {
                                s: true,
                                x1: 550,
                                y1: 150,
                                x2: 650,
                                y2: 650,
                            },
                        },
                        {
                            x: 800,
                            y: 300,
                            arc: {
                                rx: 50,
                                ry: 50,
                                rot: 0,
                                laf: 1,
                                sf: 0,
                            },
                        },
                    ] } />
            </div>
        )
    }
}

export default App
