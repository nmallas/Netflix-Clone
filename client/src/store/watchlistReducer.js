import Cookies from "js-cookie";

const SET_WATCHLIST = "watchlist/set";

export const setList = (list) => ({
    type: SET_WATCHLIST,
    list
})


export default function watchListReducer(state=[], action) {
    switch(action.type) {
        case SET_WATCHLIST:
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
            console.log(watchListContent);
            dispatch(setList(watchListContent))
        }
    }
}

export const watchListDelete = (contentId, watchListId) => {
    return async (dispatch) => {
        let res = await fetch(`/api/watchlists/${contentId}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "XSRF-TOKEN": Cookies.get("XSRF-TOKEN")
            },
            body: JSON.stringify({watchListId})
        })
        if(res.ok) {
            let watchListContent = await res.json();
            console.log(watchListContent);
            dispatch(setList(watchListContent))
        }
    }
}
