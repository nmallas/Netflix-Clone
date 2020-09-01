import React from "react";
import {login} from "../store/authReducer";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import "../styles/auth.css"


class Login extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: ""
        }
    }

    updateInput = (e) => {
        this.setState({[e.target.name]: e.target.value});
    }

    handleSubmit = async (e) => {
        e.preventDefault();
        console.log("submitting");
        this.props.createUser(this.state);
    }

    render() {
        console.log(this.props.userId)
        if(this.props.userId) {
            return(
                <Redirect to="/"/>
            )
        }
        return(
        <div className="login-container">
            <div className="login-box">
                <h1>Sign In</h1>
                <form onSubmit={this.handleSubmit} className="registration">
                    <input
                        type="text"
                        name="email"
                        value={this.email}
                        placeholder="Email Address"
                        onChange={this.updateInput}
                    />
                    <input
                        type="password"
                        name="password"
                        value={this.password}
                        placeholder="Password"
                        onChange={this.updateInput}
                    />
                    <button type="submit"> Sign In</button>
                </form>
            </div>
        </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => ({
    createUser: (user) => dispatch(login(user))
})


const connectedLogin = connect(
    null,
    mapDispatchToProps
)(Login)

export default connectedLogin;
