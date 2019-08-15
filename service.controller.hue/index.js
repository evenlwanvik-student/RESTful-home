const axios = require("axios");
const express = require("express");
const hueClient = require("./api/hueClient");
const dao = require("./dao");

const port = 80;


const devices = [
    {
        "identifier": "bedroom-ceiling-lamp-1",
        "name": "Ceiling Lamp 1",
        "attributes": {
            "hueId": "1"
        }
    },
    {
        "identifier": "bedroom-ceiling-lamp-2",
        "name": "Ceiling Lamp 2",
        "attributes": {
            "hueId": "2"
        }
    }
];

/**
 * Update all states of local device store based on actual states and  
 * initialize express server to listen on container port
 * "token" is just a dummy Promise to envoke the .then function
 */ 

// express instance, we can add middleware functions to be applied to incomming requests
// according to the sequence of implementation
const app = express();
// adding json parsing as first middleware for incomming requests
app.use(express.json());

/* ---------- Requests Middleware (express) ----------*/

// second function logs request ("next" is next function)
app.use((req, res, next) => {
    // Interpolating the request's fields into log string
    console.log(`${req.method} ${req.originalUrl} ${JSON.stringify(req.body)}`);
    next();
});

// Responds with device data based on identifier
app.get("/device/:deviceId", (req, res) => {
    const device = hueClient.findDeviceByIdentifier(req.params.deviceId)
    console.log(req.params.deviceId)
    res.json({data: device})
});

// PATCH is a request method for making partial changes to an existing resource
app.patch("/device/:deviceId", (req, res) => {
    const device = hueClient.findDeviceByIdentifier(req.params.deviceId)
    const state = req.body;
    applyState(device, state)
});

// Error handler
app.use(function (err, req, res, next) {
    console.error(err.stack);
    res.status(500).json({ message: err.message })
});

//app.listen(port, () => console.log(`Listening on port ${port}`));


