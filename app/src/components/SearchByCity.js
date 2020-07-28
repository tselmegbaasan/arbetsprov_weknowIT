import React, { Component } from 'react';
import DataService from '../api_service';
import { Search } from 'react-bootstrap-icons';

export default class SearchByCity extends Component {
    constructor(props) {
        super(props);
        this.onChangeSearchTitle = this.onChangeSearchTitle.bind(this);
        this.search = this.search.bind(this);

        this.state = {
            searchTitle: "",
            result: null
        }
    }

    search() {
        DataService.getPopulation(this.state.searchTitle)
            .then(response => {
                this.setState({
                    result: response.data.population
                })
                console.log(response.data.population)
            })
            .catch(err => {
                console.log(err)
            })
    }

    onChangeSearchTitle(e) {
        const searchTitle = e.target.value;

        this.setState({
            searchTitle: searchTitle
        });
    }

    render() {
        const searchTitle = this.state.searchTitle;
        const result = this.state.result;

        return (
            <div className="search-bar">
                <h4>SEARCH BY CITY</h4>
                <div className="input-group mb-3">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Enter a city"
                        value={searchTitle}
                        onChange={this.onChangeSearchTitle}
                    />
                </div>
                <div className="search-button input-group-append">
                    <button className="btn btn-outline-secondary btn-circle" onClick={this.search}><Search></Search></button>
                </div>

                {result}
            </div>


        )

    }

}