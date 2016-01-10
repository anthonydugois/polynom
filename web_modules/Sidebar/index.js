import React, { PropTypes } from "react"
import Button from "Button"
import Tabs from "Tabs"
import TabList from "Tabs/TabList"
import Tab from "Tabs/Tab"
import TabPanel from "Tabs/TabPanel"
import SidebarPaths from "./SidebarPaths"
import SidebarPoint from "./SidebarPoint"
import "./styles"

const Sidebar = () => (
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
      </TabList>

      <TabPanel>
        <SidebarPoint />
        <SidebarPaths />
      </TabPanel>
    </Tabs>
  </div>
)

export default Sidebar
