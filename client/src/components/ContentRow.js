import React from "react";
import "../styles/home.css";
import fetch from "node-fetch";


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

    async addToList() {
        // let res = await fetch("/")
    }

    render() {
        const topRated = (this.state.category === "Top Rated");
        return this.state.loading ? null : (
            <div className="rowContainer">
                <h4 className="category-title"> {this.state.category} </h4>
                <div className="contentContainer">
                    {/* issue= if src is invalid returns an empty photo image */}
                    {this.state.content.map(vid => (
                        (!vid.poster_path || !vid.backdrop_path) ? "" :
                        <img className="content"
                            key={`${this.props.route}${vid.id}`}
                            src={`https://image.tmdb.org/t/p/original/${topRated ? vid.poster_path : vid.backdrop_path}`}
                            alt={vid.orignal_name}
                            data-id={vid.id}
                            data-poster={vid.poster_path}
                            height={topRated ? "220px" : "125px"}
                            onClick={this.addToList}/>))
                    }
                </div>
            </div>
        )
    };
}

export default ContentRow;
