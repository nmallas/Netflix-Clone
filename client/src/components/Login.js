import React from "react";

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
        console.log(e)
        // try {
        //     let user = await fetch("/api/session", {
        //         method: "Put",
        //         headers: {
        //             "Content-Type": "application/json"
        //         },
        //         body: { }
        //     })
        // }
    }

    render() {
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

export default Login;
