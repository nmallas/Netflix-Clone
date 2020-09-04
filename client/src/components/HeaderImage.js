import React from "react";
import LogoutModal from "./LogoutModal"
import "../styles/home.css";

export default function HeaderImage() {
    const showModal = e => {
        let modal = document.getElementById("modal-container");
        modal.classList.remove("hidden");
    }

    const hideModal = e => {
        let modal = document.getElementById("modal-container");
        let res = setTimeout(()=> {
            modal.classList.add("hidden");
        }, 500)
        modal.addEventListener("mouseover", e => {
            clearTimeout(res);
        })
        modal.addEventListener("mouseleave", e=> {
            setTimeout(()=> modal.classList.add("hidden"), 100)
        })
    }

    return (
        <div className='header-image-container'  >
            <div className={`profile-5 header-image`} onMouseEnter={showModal} onMouseLeave={hideModal}/>
            <LogoutModal/>
        </div>
    )
}
