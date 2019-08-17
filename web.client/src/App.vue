<template>
  <v-app>
    <div>
      <v-toolbar>
        <v-toolbar-title>        
          <span>RESTful-home</span>
          <span class="font-weight-light"> HOME AUTOMATION</span>
        </v-toolbar-title>
        <v-spacer></v-spacer>
        <v-toolbar-items>
          <v-btn text>Link 1</v-btn>
          <v-btn text>Link 2</v-btn>
          <v-btn text href="https://github.com/evenlwanvik/RESTful-home" target="_blank">
            <span class="mr-2">Latest Release</span>
          </v-btn>
        </v-toolbar-items>
      </v-toolbar>
    </div>

    <router-view></router-view>

  </v-app>
</template>
<script>
</script>
