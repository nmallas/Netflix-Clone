import React from "react";
import Logout from "./Logout";
import "../styles/home.css"

const Header = () => {



    return (
        <nav id="header">
            <div className="header-container">
                <h3>logo</h3>
                <Logout/>
            </div>
        </nav>
    )
}

export default Header;
