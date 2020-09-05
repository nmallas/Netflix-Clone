import React from "react";
import ProfileImage from "./ProfileImage";
import NewProfile from "./NewProfile";
import { useSelector } from "react-redux";

export default function Profile() {
    const profiles = useSelector((state) => state.profiles.all)
    return(
        // <div className="profile-page-container"></div>
        <div className="profile-container">
            {profiles.map(profile =>
                <ProfileImage
                    picId={profile.imageLink}
                    name={profile.name}
                />)}
            <NewProfile numProfiles={profiles.length}/>
        </div>
    )
}
