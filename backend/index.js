const fetch = require("node-fetch");
const base_url = "http://api.geonames.org/searchJSON?";
const username = "&username=weknowit";

exports.getByCity = (req, res) => {
    const city_name = req.params.city;
    fetch(base_url + `name_equals=${city_name}` + username, {
        method: "GET"
    })
        .then(response => response.json())
        .then(data => {
            res.status(200).send({
                population: data.geonames[0].population
            })
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving data about: " + city_name
            })
        })
}

exports.getByCountry = (req, res) => {
    const country_name = req.params.country;
    fetch(base_url + `q=${country_name}` + "&maxRows=3" + '&featureCode=PPLA&featureCode=PPLC' + `&orderby=population` + username, {
        method: "GET"
    })
        .then(response => response.json())
        .then(data => {
            res.send({
                first_city: data.geonames[0].name,
                second_city: data.geonames[1].name,
                third_city: data.geonames[2].name
            }
            );
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving data for " + country_name
            })
        })
}


