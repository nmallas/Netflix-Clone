import React from "react";
import "../styles/home.css"
import HeaderImage from "./HeaderImage";
import { Link } from "react-router-dom";

const Header = () => {
    return (
        <nav id="header">
            <div className="header-container">
                <Link to="/">
                    <div className='logo'></div>
                </Link>
                <HeaderImage/>
            </div>
        </nav>
    )
}

export default Header;
