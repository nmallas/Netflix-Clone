import React from "react";
import { useDispatch } from "react-redux";
import { logOut } from "../store/authReducer"
import { Redirect } from "react-router-dom";



export default function Logout(props) {
    const dispatch = useDispatch();

    const handleLogout = async() => {
        let success = await dispatch(logOut());
        if(success) {
            return <Redirect to="/login"/>
        }
    }
    return(
        <button type="button" className="logout" onClick={handleLogout}>Log Out</button>
    )
}
