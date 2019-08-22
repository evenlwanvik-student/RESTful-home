import http from "../lib/http"
//const axios = require("axios");

// Try to get hue light identifier state
const fetchDevice = async (identifier) => {
    const url = `/hue.api/device/${identifier}`;
    const rsp = await http.get(url)
    console.log(rsp.data)
    return rsp.data
}

export default { fetchDevice };
