import React, { Component } from "react";
import DataService from "../api_service";

export default class ResultPopulation extends Component {
    constructor(props) {
        super(props);

        this.state = {
            city: "",
            result: "Loading...",
            error: false
        }
    }

    componentDidMount() {
        this.setState({
            city: this.props.match.params.cityName.toUpperCase()
        });
        this.search(this.props.match.params.cityName);
    }


    search(cityName) {
        DataService.getPopulation(cityName)
            .then(response => {
                console.log(response.data.population);

                this.setState({
                    result: response.data.population
                });
            })
            .catch(err => {
                this.setState({
                    error: true
                })
                console.log(err);
            })
    }
    render() {
        const result = this.state.result;
        const city = this.state.city;
        const error = this.state.error;

        const ErrorCondition = ({ condition, children }) => {
            if (condition) {
                return (
                    <div>
                        <div class="alert alert-secondary" role="alert">
                            The city doesn't exist or it is misspelled, please try again...
                    </div>
                        <a href="/searchbycity">
                            <button className="btn btn-outline-dark">Try again</button>
                        </a>
                    </div>

                )
            }
            return <>{children}</>;
        }

        return (
            <div className="result-list">
                <ErrorCondition condition={error}>
                    <h4>{city}</h4>
                    <ul className="list-group">
                        <li className="list-group-item">
                            <h6>POPULATION</h6>
                            {result}
                        </li>
                    </ul>
                </ErrorCondition>
            </div>
        )
    }

}