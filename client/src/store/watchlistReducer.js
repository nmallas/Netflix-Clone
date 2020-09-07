import Cookies from "js-cookie";

const ADD_TO_WATCHLIST = "watchlist/add";

const addToList = (list) => ({
    type: ADD_TO_WATCHLIST,
    list
})


export default function watchListReducer(state=[], action) {
    switch(action.type) {
        case ADD_TO_WATCHLIST:
            return action.list
        default:
            return state;
    }
}


// Add to watchlist thunk action creator
export const watchListAdd = (path, watchlistId) => {
    return async (dispatch) => {
        let res = await fetch(`/api/watchlists/${watchlistId}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "XSRF-TOKEN": Cookies.get("XSRF-TOKEN")
            },
            body: JSON.stringify({path})
        })
        if(res.ok) {
            let watchListContent = await res.json();
            dispatch(addToList(watchListContent))
        }
    }
}
