import "./styles"

import React, { PropTypes } from "react"
import Icon from "Icon"
import Tabs, { TabList, TabPanel } from "Tabs"
import SidebarPaths from "SidebarPaths"
import SidebarPoint from "SidebarPoint"
import SidebarTab from "./SidebarTab"

const Sidebar = (props) => (
  <div className="ad-Sidebar">
    <Tabs
      className="ad-SidebarTabs"
      selected={ 0 }>
      <TabList>
        <SidebarTab isTabHandler>
          <Icon name="paths" />
        </SidebarTab>
        <SidebarTab isTabHandler>
          <Icon name="point" />
        </SidebarTab>
        <SidebarTab isTabHandler>
          <Icon name="settings" />
        </SidebarTab>
        <SidebarTab isTabHandler>
          <Icon name="history" />
        </SidebarTab>
      </TabList>

      <TabPanel>
        <SidebarPaths { ...props } />
      </TabPanel>
      <TabPanel>
        <SidebarPoint { ...props } />
      </TabPanel>
    </Tabs>
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
