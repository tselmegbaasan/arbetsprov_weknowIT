import React, { Component } from 'react';
import '../App.css';

export default class Menu extends Component {
    render() {
        return (
            <div className="menu-bar">
                <a href="/searchbycity" >
                    <button className="btn btn-menu btn-outline-dark">
                        SEARCH BY CITY
                    </button>
                </a>

                <div className="divider" />
                <a href="/searchbycountry">
                    <button className="btn btn-menu btn-outline-dark">
                        SEARCH BY COUNTRY
                    </button>
                </a>
            </div>

        )

    }

}