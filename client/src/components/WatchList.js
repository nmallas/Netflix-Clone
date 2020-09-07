import React, {useEffect} from "react";
import { useSelector, useDispatch } from "react-redux";
import { setList, watchListDelete } from "../store/watchlistReducer";


export default function WatchList(){

    const dispatch = useDispatch();
    const watchlist = useSelector(state => state.watchList);
    const watchListId = useSelector(state => state.profiles.current?.watchListId);

    useEffect(() => {
        const getWatchlist = async (watchListId) => {
            const res = await fetch(`api/watchlists/${watchListId}`);
            if(res.ok) {
              let currentWatchList = await res.json();
              dispatch(setList(currentWatchList));
            }
        }
        getWatchlist(watchListId)
    }, [watchListId, dispatch]);

    const showButton = e => {
        let id = e.target.dataset.poster + "wl";
        if(!id) return;
        let button = document.getElementById(id);
        button.classList.remove("hidden");
    }

    const hideButton = e => {
        let id = e.target.dataset.poster + "wl";
        if(!id) return;
        let button = document.getElementById(id);
        button.classList.add("hidden");
    }

    const removeFromList = e => {
        let contentId = e.target.dataset.id;
        if(!contentId) return;
        dispatch(watchListDelete(contentId, watchListId));
    }


    return (!watchlist.length) ? null : (
        <div className="rowContainer">
            <h4 className="category-title"> My WatchList </h4>
            <div className="contentContainer">
                {watchlist.map(vid => (
                    // Removes faulty data
                    (!vid.poster_path) ? "" :
                    // Container for each image, given html data to identify in DOM
                    <div className="vid-container"
                        onMouseEnter={showButton}
                        onMouseLeave={hideButton}
                        data-poster={vid.poster_path}
                        key={`${vid.id}a`}>

                        <img className="content"
                            key={`${vid.id}b`}
                            src={`https://image.tmdb.org/t/p/original/${vid.poster_path}`}
                            alt={vid.id}
                            data-poster={vid.poster_path}
                            height="220px"

                        />

                        {/* Unique button for each image to remove from watchlist */}
                        <div
                            onClick={removeFromList}
                            key={vid.poster_path}
                            data-poster={vid.poster_path}
                            data-id={vid.id}
                            className="add-to-watchlist hidden"
                            id={`${vid.poster_path}wl`}>
                        x </div>

                    </div>
                    ))
                }
            </div>
        </div>
    )
}
