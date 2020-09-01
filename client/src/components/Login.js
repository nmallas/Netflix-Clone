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
            password: "",
            userId: props.userId
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

    handleDemo = e => {
        e.preventDefault();
        this.props.createUser({email: "demo@user.io", password:"password"});
    }

    render() {
        if(this.props.userId) {
            return(
                <Redirect to="/"/>
            )
        }
        return(
        <div className="login-container">
            <div className="login-box">
                <h2>Sign In</h2>
                <form onSubmit={this.handleSubmit} className="registration">
                    <input
                        type="text"
                        name="email"
                        value={this.email}
                        placeholder="Email Address"
                        className="form-input"
                        onChange={this.updateInput}
                    />
                    <input
                        type="password"
                        name="password"
                        value={this.password}
                        placeholder="Password"
                        className="form-input"
                        onChange={this.updateInput}
                    />
                    <button type="submit" className="form-input" id="signIn"> Sign In</button>
                    <button type="button" className="form-input" id="demo" onClick={this.handleDemo}> Sign In As Demo User</button>
                </form>
                <div><h4> New to NickFlix?</h4><h4 id="signUpNow"><a href="/signup">Sign Up Now!</a></h4></div>
            </div>
        </div>
        )
    }
}

const mapStateToProps = (state) => ({
    userId: state.authentication
})

const mapDispatchToProps = (dispatch) => ({
    createUser: (user) => dispatch(login(user))
})


const connectedLogin = connect(
    mapStateToProps,
    mapDispatchToProps
)(Login)

export default connectedLogin;