import React, { Component } from 'react';
import DataService from '../api_service';
import { Search } from 'react-bootstrap-icons';

export default class SearchByCountry extends Component {
    constructor(props) {
        super(props);
        this.onChangeSearchTitle = this.onChangeSearchTitle.bind(this);
        this.search = this.search.bind(this);

        this.state = {
            searchTitle: "",
            first: null,
            second: null,
            third: null
        }
    }

    onChangeSearchTitle(e) {
        const searchTitle = e.target.value;

        this.setState({
            searchTitle: searchTitle
        });
    }

    search() {
        DataService.getCities(this.state.searchTitle)
            .then(response => {
                this.setState({
                    first: response.data.first_city,
                    second: response.data.second_city,
                    third: response.data.third_city,
                })
                console.log(response.data);
            })
            .catch(err => {
                console.log(err);
            })
    }

    render() {
        const searchTitle = this.state.searchTitle;
        const first = this.state.first;
        const second = this.state.second;
        const third = this.state.third;

        return (
            <div className="search-bar">
                <h4>SEARCH BY COUNTRY</h4>
                <div className="input-group mb-3">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Enter a country"
                        value={searchTitle}
                        onChange={this.onChangeSearchTitle}
                    />
                </div>
                <div className="search-button input-group-append">
                    <button className="btn btn-outline-secondary btn-circle" onClick={this.search}><Search></Search></button>
                </div>
            </div>
        )

    }

}