import React from "react";
import { useDispatch } from "react-redux";
import { logOut } from "../store/authReducer"



export default function Logout(props) {
    const dispatch = useDispatch();

    const handleLogout = () => {
        dispatch(logOut())
    }
    return(
        <button type="button" onClick={handleLogout}>Log Out</button>
    )
}
