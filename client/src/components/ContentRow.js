import React from "react";
import "../styles/home.css";
import FeatureImage from "./FeatureImage";

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
        let res = await fetch(this.props.route);
        if(res.ok) {
            let data = await res.json();
            console.log(data.results);
            this.setState({content: data.results, loading: false})

        }
        return;
    }



    render() {
        const topRated = (this.state.category === "Top Rated");
        //future (this.state.category.indexOf("TV") > -1) ? `tv/${vid.id}` : `movie/${vid.id}`
        return this.state.loading ? null : (
            <div className="rowContainer">
                <h4 className="category-title"> {this.state.category} </h4>
                <div className="contentContainer">
                    {this.state.content.map(vid => (
                        <img className="content"
                            key={`${this.state.category}${vid.id}`}
                            src={`https://image.tmdb.org/t/p/original/${topRated ? vid.poster_path : vid.backdrop_path}`}
                            alt={vid.original_name}
                            height={topRated ? "220px" : "125px"}/>))
                    }
                </div>
            </div>
        )
    };
}

export default ContentRow;
