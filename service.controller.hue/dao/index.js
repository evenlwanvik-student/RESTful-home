/**
 * Data Access Object (dao) is a device storage abstraction
 * Typically this would be stored in a database, but I'll use a 
 * simple persistant array for now, since I only have 2 devices for now.
 */

const axios = require("axios");
const hueClient = require("../api/hueClient");

let devices = [];

// for one hue specific hue light
const host = "http://192.168.1.15";
const bridgeName = "RvA81335RAdFQRi6VQ4t-MsmzWaCZTzWlr6yk21n";
const bridgeUrl = `${host}/api/${bridgeName}` // full URL to hue bridge (controller)


const findDeviceByHueId = (hueId) => {
    return devices.find(device => device.attributes.hueId == hueId)
};


const findDeviceByIdentifier = (identifier) => {
    return devices.find(device => device.identifier == identifier)
};


/**
 * Axios fetches data of all devices connected to hue bridge, which is
 * used to update states of all devices that exists locally
 */
const fetchAllStates = async() => {

    // Add all registered devices to "devices" local array store
    rsp = await axios.get("http://service.registry.device/devices")
    devices = rsp.data.data

    // Nested object with states of each light registered on hue bridge
    lightStates = await hueClient.fetchAllStates(bridgeUrl)
    
    // TODO: Add both attributes and states as default field when registering device
    for (const hueId in lightStates) {

        const device = findDeviceByHueId(hueId);

        // If the device doesn't exist on hue bridge
        if (hueId === undefined) continue;

        // create or update the state key-value pairs
        Object.assign(device, { "state": lightStates[hueId] } );
    };
};


const applyState = (identifier, state) => {
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


module.exports = {findDeviceByHueId, fetchAllStates, applyState}