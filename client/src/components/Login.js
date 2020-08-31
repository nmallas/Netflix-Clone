import React from "react";
import {login} from "../store/authReducer";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";


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
        if(this.props.userId) {
            return(
                <Redirect to="/"/>
            )
        }
        return(
        <>
            <h1>Log In</h1>
            <form onSubmit={this.handleSubmit}>
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
        </>
        )
    }
}

const mapStateToProps = (state) => ({
    userId: state.authentication.id
})

const mapDispatchToProps = (dispatch) => ({
    createUser: (user) => dispatch(login(user))
})


const connectedLogin = connect(
    mapStateToProps,
    mapDispatchToProps
)(Login)

export default connectedLogin;
