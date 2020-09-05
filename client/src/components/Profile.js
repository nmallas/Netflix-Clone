import React from "react";
import ProfileImage from "./ProfileImage";
import NewProfile from "./NewProfile";
import { useSelector } from "react-redux";
import Header from "./Header"

export default function Profile() {
    const profiles = useSelector((state) => state.profiles.all)
    return(
        <>
        <Header/>
        {/* <h2> Who's Watching?</h2> */}
        <div className="profile-container">
            {profiles.map(profile =>
                <ProfileImage
                    picId={profile.imageLink}
                    name={profile.name}
                />)}
            <NewProfile numProfiles={profiles.length}/>
        </div>
        </>
    )
}
