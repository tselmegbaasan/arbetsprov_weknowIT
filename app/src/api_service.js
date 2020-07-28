import http from './http-common';

class DataService {
    getPopulation(cityName) {
        let encodedURI = encodeURI(cityName);
        return http.get(`/population/${encodedURI}`)
    }

    getCities(countryName) {
        let encodedURI = encodeURI(countryName);
        return http.get(`/cities/${encodedURI}`)
    }
}

export default new DataService();