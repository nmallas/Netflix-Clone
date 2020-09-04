import React from "react";
import LogoutModal from "./LogoutModal"
import "../styles/home.css";

export default function HeaderImage() {
    const showModal = e => {
        let modal = document.getElementById("modal-container");
        modal.classList.remove("hidden");
    }

    return (
        <div className='header-image-container'  >
            <div className={`profile-5 header-image`} onMouseEnter={showModal}/>
            <LogoutModal/>
        </div>
    )
}
