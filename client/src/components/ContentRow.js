import React from "react";
import "../styles/home.css";
import fetch from "node-fetch";
import { connect } from "react-redux";
import { watchListAdd } from "../store/watchlistReducer"


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
        console.log(path);
        this.props.addToWatchList(path, this.props.watchListId);
    }

    showButton(id, pp) {
        let button = document.getElementById(id);
        console.log(pp);
        if(!button) return;
        button.classList.remove("hidden");
    }

    hideButton(id) {
        let button = document.getElementById(id);
        if(!button) return;
        button.classList.add("hidden");
    }



    render() {
        console.log(this.props.wlPaths);
        const topRated = (this.state.category === "Top Rated");

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
                            // unique key for each vid
                            key={`${vid.id}${this.props.route}`}>

                            <img className="content"
                                key={`${this.props.route}${vid.id}`}
                                src={`https://image.tmdb.org/t/p/original/${topRated ? vid.poster_path : vid.backdrop_path}`}
                                alt={vid.orignal_name}
                                data-poster={vid.poster_path}
                                height={topRated ? "220px" : "125px"}

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
