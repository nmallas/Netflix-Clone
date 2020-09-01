import React from "react";
import { useState } from "react";
import { signUp } from "../store/authReducer";
import { useDispatch, useSelector} from "react-redux";
import { Redirect } from "react-router-dom";
import "../styles/auth.css"



// Using functional component and hooks
export default function SignUp(props) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setconfirmPassword] = useState("");
    const dispatch = useDispatch();
    const userId = useSelector((state) => state.authentication.id);

    const updateEmail = e => setEmail(e.target.value);
    const updatePassword = e => setPassword(e.target.value);
    const updateConfirmPassword = e => setconfirmPassword(e.target.value);
    const handleSubmit = e => {
        e.preventDefault();
        dispatch(signUp({email, password, confirmPassword}))
    }

    return userId ? <Redirect to="/"/> : (
        <div className="login-container">
            <div className="login-box">
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
                    <button type="submit" className="form-input" id="signUp"> Sign Up</button>
                </form>
                <div><h4> Already Have an Account?</h4><h4 id="signUpNow"><a href="/login">Log In!</a></h4></div>
            </div>
        </div>
    )
}
