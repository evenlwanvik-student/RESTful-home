/**
 * Data Access Object (dao) is a device storage abstraction
 * Typically this would be stored in a database, but I'll use a 
 * simple persistant array for now, since I only have 2 devices for now.
 */

const axios = require("axios");
const hueClient = require("../api/hueClient");


// Store hue devices in array
let devices = [];


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
    lightStates = await hueClient.fetchAllStates()
    
    // TODO: Add both attributes and states as default field when registering device
    for (const hueId in lightStates) {

        const device = findDeviceByHueId(hueId);

        // If the device doesn't exist on hue bridge
        if (hueId === undefined) continue;

        // create or update the state key-value pairs
        Object.assign(device, { "state": lightStates[hueId] } );
    };
};


// Apply new state to hue bridge and update local device store
const applyState = async(hueId, state) => {
    device = findDeviceByHueId(hueId)
    device.state = await hueClient.applyState(hueId, state)
};


module.exports = {findDeviceByHueId, fetchAllStates, applyState}