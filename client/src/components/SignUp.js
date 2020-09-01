import React from "react";
import { useState } from "react";
import { signUp } from "../store/authReducer";
import { useDispatch} from "react-redux";
import { Redirect } from "react-router-dom";



// Using functional component and hooks
export default function SignUp(props) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setconfirmPassword] = useState("");
    const dispatch = useDispatch();
    const userId = props.userId;

    const updateEmail = e => setEmail(e.target.value);
    const updatePassword = e => setPassword(e.target.value);
    const updateConfirmPassword = e => setconfirmPassword(e.target.value);
    const handleSubmit = e => {
        e.preventDefault();
        dispatch(signUp({email, password, confirmPassword}))
    }

    return userId ? <Redirect to="/"/> : (
        <>
            <h2> Sign Up</h2>
            <form className="registration" onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="email"
                    value={email}
                    placeholder="Email Address"
                    className="form-input"
                    onChange={updateEmail}
                />
                <input
                    type="password"
                    name="password"
                    value={password}
                    placeholder="Password"
                    className="form-input"
                    onChange={updatePassword}
                />
                <input
                    type="password"
                    name="confirmPassword"
                    value={confirmPassword}
                    placeholder="Confirm Password"
                    className="form-input"
                    onChange={updateConfirmPassword}
                />
                <button type="submit" className="form-input"> Sign Up</button>
            </form>
        </>
    )
}
