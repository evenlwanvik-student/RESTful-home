
<template>
  <v-form>
    <v-container>
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
  var jsondata = '{"id":1,"name":"A green door","price":12.50,"tags":["home","green"]}'
  export default {
    name: 'home',
    data () {
      return {
        jsonstr: JSON.stringify(JSON.parse(jsondata), null, 4),
      }
    },
    filters: {
      jsonifystr: function(value) {
        return JSON.stringify(JSON.parse(value), null, 4);
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
