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
        <div className="profile-page">
            <h2 className="profile-header"> Who's Watching?</h2>
            <div className="profile-container">
                {profiles.map(profile =>
                    <ProfileImage
                        picId={profile.imageLink}
                        name={profile.name}
                        id={profile.id}
                        key={profile.id}
                    />)}
                <NewProfile numProfiles={profiles.length}/>
            </div>
        </div>
        </>
    )
}
