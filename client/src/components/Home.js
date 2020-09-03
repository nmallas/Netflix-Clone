import React from "react";
import ContentRow from "./ContentRow";
import Header from "./Header";
import routes from "../routes";

const Home = () => {
    return (
        <div>
            <Header/>
            {Object.entries(routes).map(category => <ContentRow category={category[0]} route={category[1]} ></ContentRow>)}
        </div>
    );
}

export default Home;
