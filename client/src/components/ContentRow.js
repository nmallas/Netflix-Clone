import React from "react";
import "../styles/home.css";
import fetch from "node-fetch";
import { connect } from "react-redux";
import { watchListAdd } from "../store/watchlistReducer";
import YouTube from 'react-youtube';
import movieTrailer from "movie-trailer";
import { addTrailer, removeTrailer } from "../store/trailerReducer";


class ContentRow extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            content: [],
            category: this.props.category
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
                // If trailer already showing, close trailer on second click
                if(this.props?.trailer?.path === videoKey) {
                    this.props.trailerRemove()
                    return;
                }

                this.props.trailerAdd(videoKey, this.props.route)
            }
            return;
        }

        movieTrailer( name, {id: true, multi: false} )
            .then( res => {
                // If trailer already showing, close trailer on second click
                if(this.props?.trailer?.path === res) {
                    this.props.trailerRemove()
                    return;
                }
                this.props.trailerAdd(res, this.props.route)}
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

                {
                // Ensure trailer category in redux store is the same as route to prevent multiple trailers at once
                (this.props.trailer?.category === this.props.route)  && <YouTube videoId={this.props.trailer.path} opts={{width: "100%", margin: "20px", playerVars: {autoplay: 1}}} hidden containerClassName="trailer"/>
                }
            </div>
        )
    };
}

const mapStateToProps = (state) => ({
    watchListId: state.profiles.current?.watchListId,
    trailer: state.trailer
})

const mapDispatchToProps = dispatch => ({
    addToWatchList: (path, watchListId) => dispatch(watchListAdd(path, watchListId)),
    trailerAdd: (trailer, category) => dispatch(addTrailer(trailer, category)),
    trailerRemove: () => dispatch(removeTrailer())
})

export default connect(mapStateToProps, mapDispatchToProps)(ContentRow);
