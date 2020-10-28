/* Routes includes all the functions that will handle the end-point */

const express = require('express')
const dao = require('../dao')

// Register middleware and routing for the requests directed to app instance
const register = app => {
    
    // adding json parsing as first middleware for incomming requests
    app.use(express.json());    

    // second function logs request ("next" is next function)
    app.use((req, res, next) => {
        // Interpolating the request's fields into log string
        console.log(`${req.method} ${req.originalUrl} ${JSON.stringify(req.body)}`);
        next();
    });

    // Responds with device data based on identifier
    app.get("/device/:deviceId", (req, res) => {
        console.log(req.params.deviceId)
        const device = dao.findDeviceByIdentifier(req.params.deviceId)
        console.log(device)
        res.json({data: device})

    });

    // PATCH is a request method for making partial changes to an existing resource
    app.patch("/device/:deviceId", (req, res, next) => {

        const device = dao.findDeviceByIdentifier(req.params.deviceId)
        const state = req.body.state;

        dao.applyState(device, state)
        .then(() => {
            // Respond with the updated device state
            res.json({ data: device })
        })
        .catch(next) // error handler

    });

    // Error handler
    app.use(function (err, req, res, next) {
        console.error(err.stack);
        res.status(500).json({ message: err.message })
    });
};


exports = module.exports = { register };


