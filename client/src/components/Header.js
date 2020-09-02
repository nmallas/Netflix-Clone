import React from "react";
import Logout from "./Logout";
import "../styles/home.css"

const Header = () => {
    return (
        <nav className="header">
            <h3>logo</h3>
            <Logout/>
        </nav>
    )
}

export default Header;
