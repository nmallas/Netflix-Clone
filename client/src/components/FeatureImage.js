import React from "react";
import fetch from "node-fetch"

class FeatureImage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentVid: ''
        }
    }

    randomNum = length => Math.floor(Math.random() * length)

    async componentDidMount() {
        let res = await fetch(`/api/content/ctv`);
        if(res.ok) {
            let data = await res.json();
            console.log(data);
            let randomIndex = this.randomNum(data.length - 1);
            this.setState({currentVid: data[randomIndex]});
        }
    }

    render() {
        let vid = this.state.currentVid;
        return  (
            <div id="feature-container">
                <h1 className="feature-title"> {vid.original_name} </h1>
                {!vid?.backdrop_path ? "" :
                    <img
                        className="feature-image"
                        src={`https://image.tmdb.org/t/p/original/${vid.backdrop_path}`}
                        alt={vid.original_name}
                        data-id={vid.id}
                        data-poster={vid.poster_path}
                    />
                }

            </div>
        )
    }
}

export default FeatureImage;
