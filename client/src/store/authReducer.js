import Cookies from "js-cookie";

const LOGIN = "auth/login";
const LOGOUT = "auth/logout";


const authReducer = (state = {}, action) => {
    switch(action.type) {
        case LOGIN:
            return {id: action.id, email: action.email};
        case LOGOUT:
            return {};
        default:
            return state;
    }
}

const setUser = (id, email) => {
    return {
        type: LOGIN,
        id,
        email
    }
}

const logoutUser = () => ({
    type: LOGOUT
})

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
        if(res.ok) {
            let currentUser = await res.json();
            dispatch(setUser(currentUser.user.id, currentUser.user.email));
            return res;
        }
    }
}

export function signUp({email, password, confirmPassword}) {
    return async dispatch => {
        const res = await fetch("/api/users", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "XSRF-TOKEN": Cookies.get("XSRF-TOKEN")

            },
            body: JSON.stringify({email, password, confirmPassword})
        })
        if(res.ok) {
            let currentUser = await res.json();
            dispatch(setUser(currentUser.user.id, currentUser.user.email))
        }
    }
}

window.login = login;

export const logOut = () => {
    return async function(dispatch) {
        let res = await fetch("/api/session/logout", {
            method: "DELETE",
            headers: {
                "XSRF-TOKEN": Cookies.get("XSRF-TOKEN")
            }
        });
        if(res.ok) {
            dispatch(logoutUser());
            return "success";
        }
        return;
    }
}

export default authReducer;
