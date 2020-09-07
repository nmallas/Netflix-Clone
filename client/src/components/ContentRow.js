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

    addToList = e => {
        let path = e.target.dataset.poster;
        if(!path) return;
        this.props.addToWatchList(path, this.props.watchListId);
    }

    showButton(e) {
        let id = e.target.dataset.poster;
        if(!id) return;
        let button = document.getElementById(id);
        button.classList.remove("hidden");
    }

    hideButton(e) {
        let id = e.target.dataset.poster;
        if(!id) return;
        let button = document.getElementById(id);
        button.classList.add("hidden");
    }

    render() {

        const topRated = (this.state.category === "Top Rated");

        return this.state.loading ? null : (
            <div className="rowContainer">
                <h4 className="category-title"> {this.state.category} </h4>
                <div className="contentContainer">
                    {this.state.content.map(vid => (
                        // Removes faulty data
                        (!vid.poster_path || !vid.backdrop_path) ? "" :
                        // Container for each image, given html data to identify in DOM
                        <div className="vid-container"
                            onMouseEnter={this.showButton}
                            onMouseLeave={this.hideButton}
                            data-poster={vid.poster_path}
                            key={`${vid.id}${this.props.route}`}>

                            <img className="content"
                                key={`${this.props.route}${vid.id}`}
                                src={`https://image.tmdb.org/t/p/original/${topRated ? vid.poster_path : vid.backdrop_path}`}
                                alt={vid.orignal_name}
                                data-poster={vid.poster_path}
                                height={topRated ? "220px" : "125px"}

                            />

                            {/* Unique button for each image to add to watchlist */}
                            <div
                                onClick={this.addToList}
                                key={vid.poster_path}
                                data-poster={vid.poster_path}
                                className="add-to-watchlist hidden"
                                id={vid.poster_path}>
                            + </div>

                        </div>
                        ))
                    }
                </div>
            </div>
        )
    };
}

const mapStateToProps = (state) => ({
    watchListId: state.profiles.current?.watchListId
})

const mapDispatchToProps = dispatch => ({
    addToWatchList: (path, watchListId) => dispatch(watchListAdd(path, watchListId))
})

export default connect(mapStateToProps, mapDispatchToProps)(ContentRow);
