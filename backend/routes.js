module.exports = (app) => {
    const api = require("./index");
    const router = require("express").Router();

    router.get("/population/:city", api.getByCity);
    router.get("/cities/:country", api.getByCountry);
    app.use("/api", router);
}

