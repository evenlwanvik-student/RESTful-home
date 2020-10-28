const axios = require("axios");
const express = require("express");
const routes = require("./routes");
const hueClient = require("./api/hueClient");
const dao = require("./dao")
const port = 80;


// Read configuration for hue bridge
axios.get("http://service.config/read/service.controller.hue")
    .then(rsp => {
        hueClient.hostGateway = rsp.data.hueBridge.hostGateway
        hueClient.hostName = rsp.data.hueBridge.hostName
        console.log('*********** TESTING DEBUGGING ***********')
        return dao.fetchAllStates()
    })
    .then(() => {
        // "Express" instance, we can add middleware functions to be applied to incomming requests
        // according to the sequence of implementation
        const app = express();
        routes.register(app);
        app.listen(port, () => console.log('Listening on port ${port}'));
    })
    .catch(err => {
        console.error("Error initialising the service -", err)
    })



