/**
 * Hue Bridge Client (API)
 */

const axios = require("axios")


// for one hue specific hue light
const host = "http://192.168.1.15";
const bridgeName = "RvA81335RAdFQRi6VQ4t-MsmzWaCZTzWlr6yk21n";
const bridgeUrl = `${host}/api/${bridgeName}` // full URL to hue bridge (controller)


class HueClient {

    async fetchState(hueId) {
        return await axios.get(`${bridgeUrl}/lights/${hueId}/state`)  
    }

    /**
     * Fetches states of all devices (lights) connected to hue bridge
     * @returns {lightStates} nested object with states of each light
     */
    async fetchAllStates() {

        const rsp = await axios.get(`${bridgeUrl}/lights`)

        const lightStates = {}

        for (const hueId in rsp.data) {
            // Add state to lightStates object
            lightStates[hueId] = {
                on: rsp.data[hueId].state.on,
                brightness: rsp.data[hueId].state.bri
            }    
        };
        return lightStates
    };


    async applyState(device, state) {
        update_state = {
            "on": state.on,
            "bri": state.brightness
        }
        // Update current Hue Bridge state of device with idempotent put request
        await axios.put(`${bridgeUrl}/lights/${hueId}/state`, hueState)

        return await fetchState(hueId)
    }
}

const hueClient = new HueClient();
exports = module.exports = hueClient;