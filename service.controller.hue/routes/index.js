const express = require('express')
const dao = require('../dao')

// Register middleware and routing for the requests directed to app instance
const register = (app) => {
    
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
};





