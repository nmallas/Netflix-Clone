import React from "react";
import "../styles/home.css"
import ProfileImage from "./ProfileImage";

const Header = () => {



    return (
        <nav id="header">
            <div className="header-container">
                <h3>logo</h3>
                <ProfileImage/>
            </div>
        </nav>
    )
}

export default Header;
