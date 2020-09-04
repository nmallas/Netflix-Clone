import React from "react";
import { Link } from "react-router-dom";
import Logout from "./Logout";
import "../styles/home.css"

class LogoutModal extends React.Component {

    render() {
        return (
            <div id="modal-container" className="hidden">
                <Link className="modal-item" to="/profiles">Manage Profiles</Link>
                <Logout/>
            </div>
        )
    }
}

export default LogoutModal
