import React from "react";
import LogoutModal from "./LogoutModal"
import "../styles/home.css";
import {useSelector} from "react-redux"

export default function HeaderImage() {
    const imageId = useSelector((state) => state.profiles.current.imageLink);

    const showModal = e => {
        let modal = document.getElementById("modal-container");
        modal.classList.remove("hidden");
    }

    const hideModal = e => {
        let modal = document.getElementById("modal-container");
        let res = setTimeout(()=> {
            modal.classList.add("hidden");
        }, 400)
        modal.addEventListener("mouseover", e => {
            clearTimeout(res);
        })
        modal.addEventListener("mouseleave", e=> {
            setTimeout(()=> modal.classList.add("hidden"), 100)
        })
    }

    return (
        <div className='header-image-container'  >
            <div className={`profile-${imageId || 5} header-image`} onMouseEnter={showModal} onMouseLeave={hideModal}/>
            <LogoutModal/>
        </div>
    )
}
