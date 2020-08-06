const fetch = require("node-fetch");
const base_url = "http://api.geonames.org/searchJSON?";
const username = "&username=weknowit";

exports.getByCity = (req, res) => {
    const city_name = req.params.city;
    fetch(base_url + `q=${city_name}` + "&featureCode=PPLA&featureCode=PPLC&featureCode=PPLA2&featureCode=PPLA3&orderby=population" + username, {
        method: "GET"
    })
        .then(response => response.json())
        .then(data => {
            let number = Number(data.geonames[0].population);
            let result = formatNumber(number);

            res.status(200).send({
                population: result
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
    fetch(base_url + `q=${country_name}` + "&maxRows=10" + '&featureCode=PPLA&featureCode=PPLC' + `&orderby=population` + username, {
        method: "GET"
    })
        .then(response => response.json())
        .then(data => {
            let result = [];
            data.geonames.forEach(object => {
                if (encodeURI(object.countryName.toLowerCase()) === encodeURI(country_name.toLowerCase())) {
                    result.push(object);
                }
            })
            res.send({
                first_city: result[0].name,
                second_city: result[1].name,
                third_city: result[2].name
            }
            );
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving data for " + country_name
            })
        })
}

formatNumber = (number) => {
    let digits = number.toString().split("");
    let list = [];
    let dividers = [];
    switch (digits.length) {
        case 4: dividers = [1]; break;
        case 5: dividers = [2]; break;
        case 6: dividers = [3]; break;
        case 7: dividers = [1, 4]; break;
        case 8: dividers = [2, 5]; break;
        case 9: dividers = [3, 6]; break;
        default: break;
    }

    for (i = 0; i <= digits.length; i++) {
        if (dividers.indexOf(i) >= 0) {
            list.push(" ");
            list.push(digits[i]);
        } else {
            list.push(digits[i]);
        }
    }

    return list.join("").toString();
}