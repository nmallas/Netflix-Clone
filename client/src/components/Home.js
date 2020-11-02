import React from "react";
import ContentRow from "./ContentRow";
import Header from "./Header";
import FeatureImage from "./FeatureImage";
import WatchList from "./WatchList";
import { useSelector } from "react-redux";

const categories = {
    'Popular on NickFlix': `pn`,
    'Comedy TV Shows': `ctv`,
    'Horror Movies': `hm`,
    'Action Movies': `am`,
    'Drama TV': `dtv`,
    'Comedy Movies': `cm`,
    'Scifi TV Shows': `stv`,
}

const Home = () => {

    const watchListPaths = useSelector((state) => state.watchList?.map(vid => vid.poster_path));

    return (
        <div>
            <Header/>
            <FeatureImage/>
            <ContentRow category={'Top Rated'} route={'tr'} wlPaths={watchListPaths}/>
            <WatchList/>
            {Object.entries(categories).map(category =>
                <ContentRow
                    category={category[0]}
                    route={category[1]}
                    key={category[1]}
                />)
            }
        </div>
    );
}

export default Home;
