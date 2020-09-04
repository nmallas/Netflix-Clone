import React from "react";
import "../styles/home.css"
import HeaderImage from "./HeaderImage";

const Header = () => {
    return (
        <nav id="header">
            <div className="header-container">
                <h3>logo</h3>
                <HeaderImage/>
            </div>
        </nav>
    )
}

export default Header;
