const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");


const app = express();

app.use(cors({
    origin: "http://localhost:8081"
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.json({ message: "Welcome to my application" })
});

const PORT = process.env.PORT || 8082;

require("./backend/routes")(app);
app.listen(PORT, () => {
    console.log("App is running on server port: " + PORT)
});

