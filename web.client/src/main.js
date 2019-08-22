import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import httpClient from "./lib/http"

Vue.config.productionTip = true

// Set the apu gateway depending if in prod or dev
/*
const hostUrl =
    process.env.NODE_ENV === "production"
        ? "http://192.168.1.100:7000"
        : "http://localhost:7000";
*/
httpClient.setApiGateway(process.env.VUE_APP_API_GATEWAY);

new Vue({
    router,
    store,
    vuetify,
    mode: 'history',
    render: h => h(App)
}).$mount('#app')






/*
import proxy from './lib/proxy'
import express from 'express'

import axios from 'axios'

const port = 8080;
const proxyServer = express();
proxy.register(proxyServer)
proxyServer.listen(port, () => console.log(`Proxy server listening on port ${port}`));

console.log("here");

const fetchDevice = async (identifier) => {
  const url = `http://localhost:8080/device/${identifier}`;

  console.log('Making call to self: ', url);

  const rsp = await axios.get(url);//{headers: {"Access-Control-Allow-Origin": "*"}})
  return rsp.data;
}
const rsp = fetchDevice("bedroom-ceiling-lamp-1")
console.log(rsp.data)
*/