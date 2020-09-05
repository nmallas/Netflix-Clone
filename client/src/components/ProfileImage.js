import React from "react";

export default function ProfileImage({picId, name}) {
    return (
        <div className='profile-image-container'>
            <div className={`profile-${picId} profile`} />
            <div className={"profile-name"}> {name} </div>
        </div>
    )
}
