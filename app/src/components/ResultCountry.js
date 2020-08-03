import React, { Component } from "react";
import DataService from "../api_service";
import { Link } from "react-router-dom";

export default class ResultCountry extends Component {
    constructor(props) {
        super(props);

        this.state = {
            country: "",
            first: "Loading...",
            second: "Loading...",
            third: "Loading..."
        }
    }

    componentDidMount() {
        this.search(this.props.match.params.countryName);

        this.setState({
            country: this.props.match.params.countryName
        });
    }

    redirect(cityName) {
        let encodedURI = encodeURI(cityName);
        let url = "http://localhost:8083/searchbycity/result/" + encodedURI;
        window.location(url);
    }

    search(countryName) {
        DataService.getCities(countryName)
            .then(response => {
                console.log(response.data);

                this.setState({
                    first: response.data.first_city,
                    second: response.data.second_city,
                    third: response.data.third_city
                });
            })
            .catch(err => {
                console.log(err);
            })
    }
    render() {
        const first = this.state.first;
        const second = this.state.second;
        const third = this.state.third;
        const country = this.state.country;

        return (
            <div className="result-list">
                <h4>{country}</h4>
                <ul className="list-group">
                    <li className="list-group-item">
                        {first}
                    </li>
                    <li className="list-group-item">
                        {second}
                    </li>

                    <li className="list-group-item">
                        {third}
                    </li>

                </ul>
            </div>
        )
    }

}