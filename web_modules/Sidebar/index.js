import React, { Component, PropTypes } from "react"
import mapActionsToKeys from "react-keybindings"
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
      <div
        tabIndex={ 1 }
        className="ad-Sidebar">
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
            <SidebarPaths keyActions={ this.props.keyActions } />
          </TabPanel>
        </Tabs>
      </div>
    )
  }
}

Sidebar.propTypes = {
  keyActions: PropTypes.array.isRequired,
}

export default mapActionsToKeys({
  HOLD_CTRL: "ctrl",
})(Sidebar)
