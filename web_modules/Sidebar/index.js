import "./styles"

import React, { Component, PropTypes } from "react"
import mapActionsToKeys from "react-keybindings"
import Tabs, { TabList, TabPanel } from "Tabs"
import SidebarPaths from "SidebarPaths"
import SidebarPoint from "SidebarPoint"
import SidebarSettings from "SidebarSettings"
import SidebarTab from "./SidebarTab"
import {
  MdGesture,
  MdTune,
  MdSettings,
} from "react-icons/lib/md"
import * as KeyActionTypes from "../../src/constants/KeyActionTypes"

class Sidebar extends Component {
  render() {
    return (
      <div
        tabIndex={ 2 }
        className="ad-Sidebar">
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
              <MdSettings size="1.2rem" />
            </SidebarTab>
          </TabList>

          <TabPanel>
            <SidebarPaths { ...this.props } />
          </TabPanel>
          <TabPanel>
            <SidebarPoint { ...this.props } />
          </TabPanel>
          <TabPanel>
            <SidebarSettings { ...this.props } />
          </TabPanel>
        </Tabs>
      </div>
    )
  }
}

Sidebar.propTypes = {
  keyActions: PropTypes.array.isRequired,
  project: PropTypes.object.isRequired,
}

export SidebarActions from "./SidebarActions"
export SidebarModule from "./SidebarModule"
export SidebarPanel from "./SidebarPanel"

export default mapActionsToKeys({
  [KeyActionTypes.CTRL]: "ctrl",
  [KeyActionTypes.SHIFT]: "shift",
})(Sidebar)
