import React, { Component } from 'react';
import { Search } from 'react-bootstrap-icons';
import { Link } from 'react-router-dom';

export default class SearchByCity extends Component {
    constructor(props) {
        super(props);
        this.onChangeSearchTitle = this.onChangeSearchTitle.bind(this);

        this.state = {
            searchTitle: ""
        }
    }

    onChangeSearchTitle(e) {
        const searchTitle = e.target.value;

        this.setState({
            searchTitle: searchTitle
        });
    }

    render() {
        const searchTitle = this.state.searchTitle;

        const SearchCondition = ({ condition, children }) => (condition !== "") ? <>{children}</> : <></>


        return (
            <div className="search-bar">
                <h3>SEARCH BY CITY</h3>
                <div className="input-group mb-3">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Enter a city"
                        value={searchTitle}
                        onChange={this.onChangeSearchTitle}
                    />
                </div>
                <SearchCondition condition={searchTitle}>
                    <div className="search-button input-group-append">
                        <Link to={"/searchbycity/result/" + searchTitle} >
                            <button className="btn btn-outline-secondary btn-circle"><Search></Search></button>
                        </Link>
                    </div>
                </SearchCondition>
            </div>

        )

    }

}