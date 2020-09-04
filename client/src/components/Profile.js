import React from "react";
import ProfileImage from "./ProfileImage"
import NewProfile from "./NewProfile"

export default function Profile() {
    return(
        // <div className="profile-page-container"></div>
        <div className="profile-container">
            <ProfileImage/>
            <ProfileImage/>
            <ProfileImage/>
            <ProfileImage/>
            <NewProfile/>
        </div>
    )
}
