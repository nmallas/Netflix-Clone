import Cookies from "js-cookie";

const LOGIN = "auth/login";

const authReducer = (state = {}, action) => {
    switch(action.type) {
        case LOGIN:
            return {id: action.id};
        default:
            return state;
    }
}

const setUser = (id) => {
    return {
        type: LOGIN,
        id
    }
}

export function login({email, password}) {
    return async (dispatch) => {
        let res = await fetch("/api/session", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "XSRF-TOKEN": Cookies.get("XSRF-TOKEN")
            },
            body: JSON.stringify({email, password})
        })
        console.log(res);
        if(res.ok) {
            let user = await res.json();
            console.log(user);
            dispatch(setUser(user.id));
            return res;
        } else {
            return;
        }
    }
}

window.login = login;


export default authReducer;
