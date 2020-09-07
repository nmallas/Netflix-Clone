import React from "react";
import "../styles/home.css"
import HeaderImage from "./HeaderImage";
import { Link } from "react-router-dom";

class Header extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            show: false
        }
    }

    handleScroll = e => {
        if(window.scrollY > 450) {
            this.setState({show: true})
        } else {
            this.setState({show: false})
        }
    }

    componentDidMount() {
        window.addEventListener("scroll", this.handleScroll)
    }

    componentWillUnmount() {
        window.removeEventListener("scroll", this.handleScroll)
    }
    
    render() {
        return (
        <nav id="header" className={this.state.show ? "scroll" : "hide"}>
            <div className="header-container">
                <Link to="/">
                    <div className='logo'></div>
                </Link>
                <HeaderImage/>
            </div>
        </nav>
    )}
}

export default Header;
