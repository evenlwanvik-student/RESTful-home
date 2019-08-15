/**
 * Hue Bridge Client (API)
 */

const axios = require("axios")

class HueClient {

    // Returns the hueUrl of this instance
    get hueUrl() {
        return `${this.hostGateway}/api/${this.hostName}`;
    }

    // Fetch current state of hue lamp
    async fetchState(hueId) {
        rsp = await axios.get(`${bridgeUrl}/lights/${hueId}`) 
        return rsp.data.state
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


    async applyState(hueId, state) {
        update_state = {
            "on": state.on,
            "bri": state.brightness
        }
        // Update current Hue Bridge state of device with idempotent put request
        await axios.put(`${bridgeUrl}/lights/${hueId}/state`, update_state)

        return await this.fetchState(hueId).data
    }
}


const hueClient = new HueClient();
exports = module.exports = hueClient;