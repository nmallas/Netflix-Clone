import React from "react";
import fetch from "node-fetch"

class FeatureImage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentVid: '',
            vids: [],
            cancelTimeout: ""
        }
    }

    randomNum = length => Math.floor(Math.random() * length);

    setImage = async() =>{
        let randomIndex = this.randomNum(this.state.vids.length - 1);
        let cancel = setTimeout(this.setImage, 12500)
        this.setState({currentVid: this.state.vids[randomIndex], cancelTimeout: cancel});
    }

    async componentDidMount() {
        let res = await fetch(`/api/content/ctv`);
        if(res.ok) {
            let data = await res.json();
            this.setState({vids: data});
            this.setImage()
        }
    }

    componentWillUnmount() {
        clearTimeout(this.state.cancelTimeout)
    }

    render() {
        let vid = this.state.currentVid;
        return  !vid.overview ? <div id="feature-container"/> : (
            <div id="feature-container">
                <div className="feature-title">
                    <h1 className="feature-title-text"> {vid.original_name} </h1>
                    <h3 className="feature-details"> {vid.overview.length <= 150 ? vid.overview : (
                        vid.overview.slice(0, 150 + vid.overview.slice(150).indexOf(" ")) + "...") }
                    </h3>
                </div>
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
