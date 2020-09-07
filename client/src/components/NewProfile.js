import React, { useState } from "react";
import {createProfile} from "../store/profileReducer"
import { useDispatch, useSelector } from "react-redux";



export default function ProfileImage(props) {
    const [name, setName] = useState("");
    const [imageNum, setImageNum] = useState(5);
    const dispatch = useDispatch();
    const userId = useSelector((state) => state.authentication.id);

    const showForm = (e) => {
        let form = document.getElementById("new-profile-form")
        form.classList.remove("hidden");
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(createProfile(name, imageNum, userId))
    }

    const updateName = e => setName(e.target.value);
    const updadeImageNum = e => setImageNum(e.target.value);

    return (
        <>
            {props.numProfiles >= 3 ? null :
                <div className='profile-image-container'>
                    <div id="create-profile" className={`profile-10 profile`} onClick={showForm}/>
                    <div className={"profile-name"}>Create Profile</div>
                    <button className="hidden-button"> Delete Profile</button>
                </div>
            }
            <div id="new-profile-form" className="hidden">
                <h2 className="add-profile"> Add Profile</h2>
                <div className={`profile-${imageNum} new-profile`} />
                <h4 className="profile-description"> Add a profile for another person watching Nickflix</h4>
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        value={name}
                        id="profile-input"
                        onChange={updateName}
                        placeholder="Name"
                        required
                    />
                    <select id="new-profile-select" value={imageNum} onChange={updadeImageNum}>
                        <option value={5}> Owl </option>
                        <option value={4}> Raccoon </option>
                        <option value={3}> Lion </option>
                        <option value={2}> Monkey </option>
                        <option value={1}> Deer </option>
                    </select>
                    <button id="new-profile-button" type="submit">Create Profile</button>
                </form>
            </div>
        </>
    )
}
