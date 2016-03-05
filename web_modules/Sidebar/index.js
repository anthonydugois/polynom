import "./styles"

import React, { PropTypes } from "react"
import { ButtonTab } from "Button"
import Icon from "Icon"
import Tabs, { Tab, TabList, TabPanel } from "Tabs"
import SidebarSettings from "SidebarSettings"
import SidebarPaths from "SidebarPaths"
import SidebarPoint from "SidebarPoint"

const Sidebar = (props) => (
  <div className="ad-Sidebar">
    <div className="ad-Sidebar-head">
      <SidebarSettings { ...props } />
    </div>

    <div className="ad-Sidebar-tabs">
      <Tabs selected={ 0 }>
        <TabList>
          <Tab>
            <ButtonTab>
              <Icon name="paths" />
              Paths
            </ButtonTab>
          </Tab>
          <Tab>
            <ButtonTab>
              <Icon name="point" />
              Point
            </ButtonTab>
          </Tab>
        </TabList>

        <TabPanel>
          <SidebarPaths { ...props } />
        </TabPanel>
        <TabPanel>
          <SidebarPoint { ...props } />
        </TabPanel>
      </Tabs>
    </div>
  </div>
)

Sidebar.propTypes = {
  keyActions: PropTypes.array.isRequired,
  project: PropTypes.object.isRequired,
}

export SidebarActions from "./SidebarActions"
export SidebarModule from "./SidebarModule"
export SidebarPanel from "./SidebarPanel"
export default Sidebar
