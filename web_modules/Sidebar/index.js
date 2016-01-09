import React, { Component, PropTypes } from "react"
import { connect } from "react-redux"
import Button from "Button"
import Tabs from "Tabs"
import TabList from "Tabs/TabList"
import Tab from "Tabs/Tab"
import TabPanel from "Tabs/TabPanel"
import Path from "Path"
import "./styles"

class Sidebar extends Component {
  renderPath(path) {
    return (
      <Path
        key={ path.id }
        path={ path } />
    )
  }

  render() {
    const { paths } = this.props

    return (
      <div className="ad-Sidebar">
        <Tabs selected={ 0 }>
          <TabList>
            <Tab>
              <Button
                icon="paths"
                type="tab">
                Paths
              </Button>
            </Tab>
            <Tab>
              <Button
                icon="settings"
                type="tab">
                Settings
              </Button>
            </Tab>
          </TabList>

          <TabPanel>
            { paths.map(this.renderPath) }
          </TabPanel>
          <TabPanel><div>World!</div></TabPanel>
        </Tabs>
      </div>
    )
  }
}

Sidebar.propTypes = {
  dispatch: PropTypes.func.isRequired,
  paths: PropTypes.array.isRequired,
}

export default connect((state) => state)(Sidebar)
