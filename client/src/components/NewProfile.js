import React, { useState } from "react";

export default function ProfileImage() {
    let [name, setName] = useState("");
    let [imageNum, setImageNum] = useState(5);


    const showForm = () => {
        return;
    }

    const updateName = e => setName(e.target.value);
    const updadeImageNum = e => setImageNum(e.target.value);

    return (
        <>
            <div className='profile-image-container'>
                <div className={`profile-10 profile`} onClick={showForm}/>
            </div>
            <div className="new-profile-form">
                <h2 className="add-profile"> Add Profile</h2>
                <h4 className="profile-description"> Add a profile for another person watching Nickflix</h4>
                <form >
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
