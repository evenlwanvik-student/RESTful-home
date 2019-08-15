const axios = require("axios");
const express = require("express");
const routes = require("./routes");
const hueClient = require("./api/hueClient");
const dao = require("./dao")
const port = 80;


// "Express" instance, we can add middleware functions to be applied to incomming requests
// according to the sequence of implementation
const app = express();
// adding json parsing as first middleware for incomming requests
//app.use(express.json());

// Read configuration for hue bridge
axios.get("http://service.config/read/service.controller.hue")
    .then(rsp => {
        hueClient.hostGateway = rsp.data.hueBridge.hostGateway
        hueClient.hostName = rsp.data.hueBridge.hostName
        return dao.fetchAllStates()
    })
    .then(() => {
        routes.register(app)
        app.listen(port, () => console.log(`Listening on port ${port}`));
    })



