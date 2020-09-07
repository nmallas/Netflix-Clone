import Cookies from "js-cookie";



const CREATE_PROFILE = "profile/create";
const SET_PROFILE = "profile/setCurrent";
const REMOVE_PROFILE = "profile/remove";

export default function profile(state= {current: {}, all:[]}, action) {
    switch(action.type) {
        case CREATE_PROFILE:
            return {current: action.profile, all: [...state.all, action.profile]};
        case SET_PROFILE:
            return {current: state.all.filter(prof => prof.id === action.id)[0] || {}, all: [...state.all]};
        case REMOVE_PROFILE:
            let filtered = state.all.filter(prof => prof.id !== action.id);
            return filtered.length ? {current: filtered[0], all: filtered} : {current: {}, all:[]};
        default:
            return state;
    }
}

const newProfile = (profile) => ({
    type: CREATE_PROFILE,
    profile
})

export const setProfile = (id) => ({
    type: SET_PROFILE,
    id
})

const removeProfile = (id) => ({
    type: REMOVE_PROFILE,
    id
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

export const deleteProfile = profileId => {
    return async (dispatch) => {
        let res = await fetch(`/api/profiles/${profileId}`, {
            method: "DELETE",
            headers: {
                "XSRF-TOKEN": Cookies.get("XSRF-TOKEN")
            }
        });
        if(res.ok) {
            dispatch(removeProfile(profileId))
        }
    }
}
