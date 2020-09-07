import React, {useEffect} from "react";
import { useSelector, useDispatch } from "react-redux";
import { setList } from "../store/watchlistReducer";


export default function WatchList(){

    const dispatch = useDispatch();
    const watchlist = useSelector(state => state.watchList);
    const watchListId = useSelector(state => state.profiles.current.watchListId);

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

    return !watchlist.length ? null : (
        <div className="rowContainer">
            <h4 className="category-title"> My WatchList </h4>
            <div className="contentContainer">
                {watchlist.map(vid => (
                    // Removes faulty data
                    (!vid.poster_path) ? "" :
                    // Container for each image, given html data to identify in DOM
                    <div className="vid-container"
                        // onMouseEnter={this.showButton}
                        // onMouseLeave={this.hideButton}
                        data-poster={vid.poster_path}
                        key={`${vid.id}a`}>

                        <img className="content"
                            key={`${vid.id}b`}
                            src={`https://image.tmdb.org/t/p/original/${vid.poster_path}`}
                            alt={vid.id}
                            data-poster={vid.poster_path}
                            height="220px"

                        />

                        {/* Unique button for each image to add to watchlist */}
                        <div
                            // onClick={this.addToList}
                            key={vid.poster_path}
                            data-poster={vid.poster_path}
                            className="add-to-watchlist hidden"
                            id={`${vid.poster_path}wl`}>
                        + </div>

                    </div>
                    ))
                }
            </div>
        </div>
    )
}
