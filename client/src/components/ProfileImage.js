import React from "react";
import {setProfile, deleteProfile} from "../store/profileReducer";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

export default function ProfileImage({picId, name, id}) {
    const dispatch = useDispatch();

    function setCurrentProfile() {
        dispatch(setProfile(id));
    }

    function handleDelete() {
        dispatch(deleteProfile(id))
    }

    return (
        <div className='profile-image-container'>
            <Link to="/">
                <div className={`profile-${picId} profile`} onClick={setCurrentProfile} />
            </Link>
            <div className="profile-name"> {name} </div>
            <button className="delete-profile" onClick={handleDelete}> Delete Profile</button>
        </div>
    )
}
