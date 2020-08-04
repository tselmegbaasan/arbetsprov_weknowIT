import http from './http-common';

class DataService {
    getPopulation(cityName) {
        let formattedURI = this.formatURI(cityName);
        let encodedURI = encodeURI(formattedURI);
        return http.get(`/population/${encodedURI}`)
    }

    getCities(countryName) {
        let formattedURI = this.formatURI(countryName);
        let encodedURI = encodeURI(formattedURI);
        return http.get(`/cities/${encodedURI}`)
    }

    formatURI(uri) {
        let formattedURI = "";
        uri.split("").forEach(character => {
            if (character.toLowerCase() === "å" || character.toLowerCase() === "ä") {
                formattedURI += 'a'
            } else if (character.toLowerCase() === "ö") {
                formattedURI += 'o'
            } else {
                formattedURI += character
            }
        })
        return formattedURI;
    }
}

export default new DataService();