import React, { useEffect } from "react";
import ContentRow from "./ContentRow";
import Header from "./Header";
import FeatureImage from "./FeatureImage";
import WatchList from "./WatchList";
import { useSelector, useDispatch } from "react-redux";
import { removeTrailer } from "../store/trailerReducer";

const categories = {
    'Top Rated': `tr`,
    'Comedy TV Shows': `ctv`,
    'Horror Movies': `hm`,
    'Action Movies': `am`,
    'Drama TV': `dtv`,
    'Comedy Movies': `cm`,
    'Scifi TV Shows': `stv`,
}

const Home = () => {


    const watchListPaths = useSelector((state) => state.watchList?.map(vid => vid.poster_path));
    const dispatch = useDispatch();

    useEffect(()=> {
        document.body.addEventListener("click", e => {
            // If click is anywhere besides movie content, close open trailers
            if(!(e.target.classList[0] === "content")) {
                dispatch(removeTrailer())
            }
        })
    }, [])


    return (
        <div>
            <Header/>
            <FeatureImage/>
            <ContentRow category={'Popular on NickFlix'} route={'pn'} wlPaths={watchListPaths}/>
            <WatchList/>
            {Object.entries(categories).map(category =>
                <ContentRow
                    wlPaths={watchListPaths}
                    category={category[0]}
                    route={category[1]}
                    key={category[1]}
                />)
            }
        </div>
    );
}

export default Home;
