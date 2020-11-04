import React from "react";
import "../styles/home.css";
import fetch from "node-fetch";
import { connect } from "react-redux";
import { watchListAdd } from "../store/watchlistReducer";
import YouTube from 'react-youtube';
import movieTrailer from "movie-trailer";


class ContentRow extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            content: [],
            category: this.props.category,
            showTrailer: false
        }
    }

    async componentDidMount() {
        let res = await fetch(`/api/content/${this.props.route}`);
        if(res.ok) {
            let data = await res.json();
            this.setState({content: data, loading: false})
        }
        return;
    }

    addToList = path => {
        if(!path) return;
        this.props.addToWatchList(path, this.props.watchListId);
    }

    showButton(id, pp) {
        let button = document.getElementById(id);
        if(!button) return;
        button.classList.remove("hidden");
    }

    hideButton(id) {
        let button = document.getElementById(id);
        if(!button) return;
        button.classList.add("hidden");
    }

    async showTrailer (e, vid) {

        // Don't show trailer on add to watchlist button click
        if(e.target.classList[0] === "add-to-watchlist") return;

        let name = vid.title || vid.name || vid.orignal_name || vid.original_title;

        let tvCategories =  [
            'Comedy TV Shows',
            'Drama TV',
            'Scifi TV Shows',
        ]

        // if tv show fetch tv trailer from api
        if(tvCategories.includes(this.state.category)) {
            let res = await fetch(`/api/tvtrailer/${vid.id}`);
            if(res.ok) {
                let data = await res.json();
                let videoKey = data[0]?.key || false;
                this.setState({showTrailer: videoKey});
            }
            return;
        }

        movieTrailer( name, {id: true, multi: false} )
            .then( res => {
                if(this.state.showTrailer === res) {
                    // If trailer already showing, close trailer on second click
                    this.setState({showTrailer: false});
                    return;
                }
                this.setState({showTrailer: res})}
            )


    }



    render() {
        const popular = (this.state.category === "Popular on NickFlix");

        return this.state.loading ? null : (
            <div className="rowContainer">
                <h4 className="category-title"> {this.state.category} </h4>
                <div className="contentContainer">
                    {this.state.content.map(vid => (
                        // Removes faulty data
                        (!vid.poster_path || !vid.backdrop_path) ? "" :
                        // Container for each image
                        <div className="vid-container"
                            onMouseEnter={() => this.showButton(`${vid.id}${this.props.route}`, vid.poster_path)}
                            onMouseLeave={() => this.hideButton(`${vid.id}${this.props.route}`)}
                            onClick={(e) => this.showTrailer(e, vid)}
                            // unique key for each vid
                            key={`${vid.id}${this.props.route}`}>

                            <img className="content"
                                key={`${this.props.route}${vid.id}`}
                                src={`https://image.tmdb.org/t/p/original/${popular ? vid.poster_path : vid.backdrop_path}`}
                                alt={vid.orignal_name}
                                data-poster={vid.poster_path}
                                height={popular ? "220px" : "125px"}

                            />

                            {/* Unique button for each image to add to watchlist */}
                            {/* Only render button if content is not already in watchlist */}
                            {
                            !this.props.wlPaths?.includes(vid.poster_path) ?

                            <div
                                onClick={() => this.addToList(vid.poster_path)}
                                key={vid.poster_path}
                                className="add-to-watchlist hidden"
                                id={`${vid.id}${this.props.route}`}
                            >
                            +
                            </div>

                            :
                            ""
                        }

                        </div>
                        ))
                    }
                </div>
                { this.state.showTrailer && <YouTube videoId={this.state.showTrailer} opts={{width: "100%", margin: "20px"}} hidden containerClassName="trailer"/>}
            </div>
        )
    };
}

const mapStateToProps = (state) => ({
    watchListId: state.profiles.current?.watchListId,
})

const mapDispatchToProps = dispatch => ({
    addToWatchList: (path, watchListId) => dispatch(watchListAdd(path, watchListId)),
})

export default connect(mapStateToProps, mapDispatchToProps)(ContentRow);
