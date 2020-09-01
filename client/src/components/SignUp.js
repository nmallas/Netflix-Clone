import React from "react";
import { useState } from "react";
import { signUp } from "../store/authReducer";
import { useDispatch } from "react-redux";



// Using functional component and hooks
export default function SignUp(props) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setconfirmPassword] = useState("");
    const dispatch = useDispatch();

    const updateEmail = e => setEmail(e.target.value);
    const updatePassword = e => setPassword(e.target.value);
    const updateConfirmPassword = e => setconfirmPassword(e.target.value);
    const handleSubmit = e => {
        e.preventDefault();
        dispatch(signUp({email, password, confirmPassword}))
    }

    return (
        <>
            <h2> Sign Up</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="email"
                    value={email}
                    placeholder="Email Address"
                    onChange={updateEmail}
                />
                <input
                    type="password"
                    name="password"
                    value={password}
                    placeholder="Password"
                    onChange={updatePassword}
                />
                <input
                    type="password"
                    name="confirmPassword"
                    value={confirmPassword}
                    placeholder="Confirm Password"
                    onChange={updateConfirmPassword}
                />
                <button type="submit"> Sign Up</button>
            </form>
        </>
    )
}
