import Cookies from "js-cookie";



const CREATE_PROFILE = "profile/create"

export default function profile(state= {current: null, all:[]}, action) {
    switch(action.type) {
        case CREATE_PROFILE:
            return {current: action.profile.id, all: [...state.all, action.profile]}
        default:
            return state;
    }
}

const newProfile = (profile) => ({
    type: CREATE_PROFILE,
    profile
})

export const createProfile = (name, imageLink, userId) => {
    return async function(dispatch) {
        let res = await fetch("/api/profiles", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "XSRF-TOKEN": Cookies.get("XSRF-TOKEN")
            },
            body: JSON.stringify({name, imageLink, userId})
        })
        console.log(res);
        if(res.ok) {
            let profile = await res.json();
            dispatch(newProfile(profile));
            let form = document.getElementById("new-profile-form")
            form.classList.add("hidden");
        } else {
            alert("Error creating account")
            window.location.href("/")
        }
    }
}
