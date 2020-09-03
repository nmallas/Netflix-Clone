import React, { useEffect, useState } from "react";
import routes from "../routes";
let topRated = routes['Top Rated'];

export default function FeatureImage() {
    const [randomImage, setRandomImage] = useState({})

    function setImage() {
        let randomNum = Math.floor(Math.random() * topRated.length)
        setRandomImage(topRated[randomNum]);
    }
    useEffect(setImage, [])
    console.log(topRated);
    return(<div></div>)
}
