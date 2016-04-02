import "./styles"

import React, { PropTypes } from "react"
import Tabs, { TabList, TabPanel } from "Tabs"
import SidebarPaths from "SidebarPaths"
import SidebarPoint from "SidebarPoint"
import SidebarSettings from "SidebarSettings"
import SidebarTab from "./SidebarTab"
import {
  MdGesture,
  MdTune,
  MdHistory,
  MdSettings,
} from "react-icons/lib/md"

const Sidebar = (props) => (
  <div className="ad-Sidebar">
    <Tabs
      className="ad-SidebarTabs"
      selected={ 0 }>
      <TabList>
        <SidebarTab isTabHandler>
          <MdGesture size="1.2rem" />
        </SidebarTab>
        <SidebarTab isTabHandler>
          <MdTune size="1.2rem" />
        </SidebarTab>
        <SidebarTab isTabHandler>
          <MdHistory size="1.2rem" />
        </SidebarTab>
        <SidebarTab isTabHandler>
          <MdSettings size="1.2rem" />
        </SidebarTab>
      </TabList>

      <TabPanel>
        <SidebarPaths { ...props } />
      </TabPanel>
      <TabPanel>
        <SidebarPoint { ...props } />
      </TabPanel>
      <TabPanel></TabPanel>
      <TabPanel>
        <SidebarSettings { ...props } />
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
