const axios = require("axios");
const express = require("express");

// for one hue specific hue light
const host = "http://192.168.1.15";
const bridgeName = "RvA81335RAdFQRi6VQ4t-MsmzWaCZTzWlr6yk21n";
const bridgeUrl = `${host}/api/${bridgeName}` // full URL to hue bridge (controller)
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

const findDeviceByHueId = (hueId) => {
    return devices.find(device => device.attributes.hueId == hueId)
};

const findDeviceByIdentifier = (identifier) => {
    return devices.find(device => device.identifier == identifier)
};

/**
 * Update the state of all hue devices registered locally. 
 * Axios requests the data of all devices connected to hue bridge.
 * Run through all devices that also exists locally and update their state
 */
const updateStates = () => {
    axios.get(`${bridgeUrl}/lights`)
        .then(resp => {
            for (const hueId in resp.data) {
                const device = findDeviceByHueId(hueId);
                // Continue if hue device from bridge does not exist in local store
                if (device === undefined) continue;
                // create or update the state key-value pairs
                device.state = {}
                device.state.on = resp.data[hueId].state.on;
                device.state.brightness = resp.data[hueId].state.bri;
            };
        });
};

// Helper function for updating a state of device
const applyState = (device, state) => {
    const hueState = {
        on: state.on,
        bri: state.brightness
    };
    // Update current Hue Bridge state of device with idempotent put request
    bridgeStateUrl = `${hueUrl}/lights/${device.attributes.hueId}/state`
    axios.put(bridgeStateUrl, hueState)
        .then(() => {
            // Check if state has been updated
            axios.get(bridgeStateUrl)
        });
};


/**
 * Update all states of local device store based on actual states and  
 * initialize express server to listen on container port
 */ 
// todo: we need some sort of promise returned from updateStates to 
// envoke the .then function
updateStates().then(() => {
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
        const device = findDeviceByIdentifier(req.params.deviceId)
        console.log(req.params.deviceId)
        res.json({data: device})
    });

    // PATCH is a request method for making partial changes to an existing resource
    app.patch("/device/:deviceId", (req, res) => {
        const device = findDeviceByIdentifier(req.params.deviceId)
        const state = req.body;
    });

    // Error handler
    app.use(function (err, req, res, next) {
        console.error(err.stack);
        res.status(500).json({ message: err.message })
    });

    app.listen(port, () => console.log(`Listening on port ${port}`));
});

