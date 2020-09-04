import React from "react";
import ContentRow from "./ContentRow";
import Header from "./Header";
import FeatureImage from "./FeatureImage";

const categories = {
    'Top Rated': `tr`,
    'Popular on NickFlix': `pn`,
    'Comedy TV Shows': `ctv`,
    'Horror Movies': `hm`,
    'Action Movies': `am`,
    'Drama TV': `dtv`,
    'Comedy Movies': `cm`,
    'Scifi TV Shows': `stv`,
}

const hideModal = e => {
    let modal = document.getElementById("modal-container");
    if(e.target !== modal) {
        modal.classList.add("hidden");
    }
}


const Home = () => {
    return (
        <div onClick={hideModal}>
            <Header/>
            <FeatureImage/>
            {Object.entries(categories).map(category =>
                <ContentRow category={category[0]}
                route={category[1]} />)}
        </div>
    );
}

export default Home;
