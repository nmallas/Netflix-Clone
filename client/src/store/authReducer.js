import Cookies from "js-cookie";

const LOGIN = "auth/login";
const CREATE = "auth/create";
const LOGOUT = "auth/logout";


const authReducer = (state = {}, action) => {
    switch(action.type) {
        case LOGIN:
            return {id: action.id};
        case CREATE:
            return {id: action.id};
        case LOGOUT:
            return {};
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

const createUser = (id) => {
    return {
        type: CREATE,
        id
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
            console.log(currentUser.user.id);
            dispatch(setUser(currentUser.user.id));
            return res;
        }
    }
}

export function signUp({email, password, confirmPassword}) {
    console.log({email, password, confirmPassword})
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
            console.log("succesfully created user");
            let currentUser = await res.json();
            console.log(currentUser)
            dispatch(createUser(currentUser.user.id))
        }
    }
}

window.login = login;

export const logOut = () => {
    return async function(dispatch) {
        let res = await fetch("/api/session/logout", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "XSRF-TOKEN": Cookies.get("XSRF-TOKEN")

            },
            body: ""
        });
        if(res.ok) {
            dispatch(logoutUser())
        }
        return;
    }
}

export default authReducer;
