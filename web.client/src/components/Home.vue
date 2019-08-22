
<template>
  <v-form>
    <v-container>
      <!--<v-switch :label="`Berdoom Ceiling Lamp 1: ${bedroomCeilingLamp1.toString()}`" v-model="bedroomCeilingLamp1"></v-switch>
      <v-switch :label="`Berdoom Ceiling Lamp 2: ${bedroomCeilingLamp2.toString()}`" v-model="bedroomCeilingLamp2"></v-switch>-->
      <v-layout>
        <v-flex xs12 sm6 md3>
          <v-text-field
            label="HTTP-request"
            placeholder="Placeholder"
            outlined
          ></v-text-field>
          <v-textarea
            outlined
            auto-grow
            name="HTTP-response"
            label="HTTP-response"
            v-model="jsonstr"
            rows="8" cols="40"
          ></v-textarea>
        </v-flex>
      </v-layout>
    </v-container>
  </v-form>
</template>

<script>

	import api from '../api';
	//import axios from 'axios'

	var jsondata = 'state not loaded yet'

	// Fetch data
	window.addEventListener("load", () => { 
		jsondata = api.fetchDevice("bedroom-ceiling-lamp-1")
		/*
		axios.get("/hue.api/device/bedroom-ceiling-lamp-1")
			.then(response => {
				console.log("----- SUCCESS -----");
				console.log(response);
			})
			.catch((error) => {
				console.log("----- ERROR -----");
				console.log(error);
			})
		*/
	});

	export default {
		name: 'home',

		created() {
		},

		data() {
			return {
				jsonstr: JSON.stringify(JSON.parse(jsondata), null, 4),
				bedroomCeilingLamp1: true,
			}
		},

		filters: {
			jsonifystr: function(value) {
				return JSON.stringify(JSON.parse(value), null, 4);
			}
		},

		methods: {
		}
	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
