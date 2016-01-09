import React, { Component, PropTypes } from "react"
import Button from "Button"
import Tabs from "Tabs"
import TabList from "Tabs/TabList"
import Tab from "Tabs/Tab"
import TabPanel from "Tabs/TabPanel"
import SidebarPaths from "./SidebarPaths"
import SidebarPoint from "./SidebarPoint"
import "./styles"

class Sidebar extends Component {
  render() {
    return (
      <div className="ad-Sidebar">
        <Tabs selected={ 1 }>
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
                icon="point"
                type="tab">
                Point
              </Button>
            </Tab>
          </TabList>

          <TabPanel>
            <SidebarPaths />
          </TabPanel>

          <TabPanel>
            <SidebarPoint />
          </TabPanel>
        </Tabs>
      </div>
    )
  }
}

export default Sidebar
