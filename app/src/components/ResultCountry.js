import React, { Component } from "react";
import DataService from "../api_service";
import { Link } from "react-router-dom";

export default class ResultCountry extends Component {
    constructor(props) {
        super(props);

        this.state = {
            country: "",
            first: "",
            second: "",
            third: "",
            loading: true,
            error: false
        }
    }

    componentDidMount() {
        this.search(this.props.match.params.countryName);

        this.setState({
            country: this.props.match.params.countryName.toUpperCase()
        });
    }

    search(countryName) {
        DataService.getCities(countryName)
            .then(response => {
                console.log(response.data);

                this.setState({
                    first: response.data.first_city,
                    second: response.data.second_city,
                    third: response.data.third_city,
                    loading: false,
                    error: false
                });
            })
            .catch(err => {
                this.setState({
                    loading: false,
                    error: true
                })
                console.log(err);
            })
    }
    render() {
        const first = this.state.first;
        const second = this.state.second;
        const third = this.state.third;
        const country = this.state.country;
        const loading = this.state.loading;
        const error = this.state.error;



        const ConditionalContent = ({ isLoading, error, children }) => {
            if (isLoading) {
                return (
                    <div class="spinner-border" role="status">
                        <span class="sr-only">Loading...</span>
                    </div>
                )
            } else {
                if (error) {
                    return (
                        <div>
                            <div class="alert alert-secondary" role="alert">
                                The country doesn't exist or it is misspelled, please try again...
                        </div>
                            <a href="/searchbycountry">
                                <button className="btn btn-outline-dark">Try again</button>
                            </a>
                        </div>
                    )
                } else {
                    return children
                }

            }
        }

        return (
            <div className="result-list" >
                <ConditionalContent isLoading={loading} error={error}>
                    <h4>{country}</h4>
                    <ul className="list-group">
                        <Link
                            to={"/searchbycity/result/" + first} style={{ color: 'black', textDecoration: 'none' }}>
                            <li className="list-group-item">
                                {first}
                            </li>
                        </Link>
                        <Link to={"/searchbycity/result/" + second} style={{ color: 'black', textDecoration: 'none' }}>
                            <li className="list-group-item">
                                {second}
                            </li>
                        </Link>
                        <Link to={"/searchbycity/result/" + third} style={{ color: 'black', textDecoration: 'none' }}>
                            <li className="list-group-item">
                                {third}
                            </li>
                        </Link>
                    </ul>
                </ConditionalContent>
            </div >
        )
    }

}