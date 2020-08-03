import React, { Component } from "react";
import DataService from "../api_service";

export default class ResultPopulation extends Component {
    constructor(props) {
        super(props);

        this.state = {
            city: "",
            result: "Loading..."
        }
    }

    componentDidMount() {
        this.setState({
            city: this.props.match.params.cityName
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
                console.log(err);
            })
    }
    render() {
        const result = this.state.result;
        const city = this.state.city;
        return (
            <div className="result-list">
                <h4>{city}</h4>
                <ul className="list-group">
                    <li className="list-group-item">
                        <h6>POPULATION</h6>
                        {result}
                    </li>
                </ul>
            </div>
        )
    }

}