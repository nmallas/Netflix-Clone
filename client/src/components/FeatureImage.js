import React from "react";
import routes from "../routes";
let topRated = routes['Comedy TV Shows'];

class FeatureImage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentVid: ''
        }
    }

    randomNum = length => Math.floor(Math.random() * length)

    async componentDidMount() {
        let res = await fetch(topRated);
        if(res.ok) {
            let data = await res.json();
            console.log(data.results);
            let randomIndex = this.randomNum(data.results.length - 1);
            if(!data.results[randomIndex].backdrop_path) randomIndex = this.randomNum(data.results.length - 1);
            this.setState({currentVid: data.results[randomIndex]});
            console.log(this.state);
        }
    }

    render() {
        let vid = this.state.currentVid;
        return (
            <div id="feature-container">
                <img
                    className="feature-image"
                    src={`https://image.tmdb.org/t/p/original/${vid.backdrop_path}`}/>
            </div>
        )
    }
}

export default FeatureImage;
