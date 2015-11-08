import React from "react"

import { platform } from "../../src/utils/keybinding"

function Help(props) {
    const ctrl = platform("mac") ? "Cmd" : "Ctrl"

    return (
        <div className="ad-Help">
            <div className="ad-Help-section">
                <h4 className="ad-Help-title">
                    Keyboard shortcuts
                </h4>

                <div className="ad-Help-content">
                    <ul className="ad-Help-shortcuts">
                        <li className="ad-Shortcut">
                            <div className="ad-Shortcut-keys">Click</div>
                            <div className="ad-Shortcut-action">Select point or path</div>
                        </li>

                        <li className="ad-Shortcut">
                            <div className="ad-Shortcut-keys">{ ctrl }+Click</div>
                            <div className="ad-Shortcut-action">Add point to active path</div>
                        </li>

                        <li className="ad-Shortcut">
                            <div className="ad-Shortcut-keys">{ ctrl }+P</div>
                            <div className="ad-Shortcut-action">Create path</div>
                        </li>

                        <li className="ad-Shortcut">
                            <div className="ad-Shortcut-keys">{ ctrl }+D</div>
                            <div className="ad-Shortcut-action">Delete active path</div>
                        </li>

                        <li className="ad-Shortcut">
                            <div className="ad-Shortcut-keys">{ ctrl }+R</div>
                            <div className="ad-Shortcut-action">Remove active point</div>
                        </li>

                        <li className="ad-Shortcut">
                            <div className="ad-Shortcut-keys">{ ctrl }+Q</div>
                            <div className="ad-Shortcut-action">Select next point of active path</div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Help
