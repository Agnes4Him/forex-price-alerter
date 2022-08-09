//import { useState } from "react";
import { FaToggleOn, FaToggleOff } from "react-icons/fa";

const ToggleButton = ({onOn, onOff, toggle}) => {

    return (
        <div className="toggle-container">
            <h4>Send Email Notification</h4>
            <div className="toggle">
                { toggle && <div className="toggle-off"><FaToggleOff onClick={onOn} /></div> }
                { !toggle && <div className="toggle-on"><FaToggleOn onClick={onOff} /></div> }
            </div>
        </div>
    )
}

export default ToggleButton