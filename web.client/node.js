// Create Vue instance
new Vue({
  data: {
    // Uh oh - appName is *also* the name of the
    // instance property we defined!
    appName: 'The name of some other app'
  },
  beforeCreate: function() {
    console.log(this.appName)
  },
  created: function() {
    console.log(this.appName)
  }
})