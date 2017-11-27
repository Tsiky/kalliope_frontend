<template>
  <div id="app">

    <div class="ui inverted segment">
      <div class="ui inverted secondary pointing menu">
        <!--<div class="header item">-->
          <img class="header_item_custom" src="./assets/small_logo.png">
        <!--</div>-->
        <router-link class="item" to="/home">
          Home
        </router-link>
        <router-link class="item" to="/situations">
          Situations
        </router-link>
        <router-link class="item" to="/actions">
          Actions
        </router-link>
        <router-link class="item" to="/channels">
          Channels
        </router-link>
        <router-link class="item" to="/triggers">
          Triggers
        </router-link>
        <router-link class="item" to="/rules">
          Rules
        </router-link>
      </div>
    </div>

    <!-- Site content !-->
    <div class="ui container">
      <router-view/>
    </div>

  </div>
</template>

<script>
  import Store from './store/StoreVuex.vue'
  export default {
    name: 'app',
    created: function () {
      // TEMP
      this.$http.put('/api/myapp/situation', { 'name': 'FirstSituation' }).then(response => {
        console.log(response.body)
      }, response => {
        // error callback
        console.log(response.body)
      })
      this.$http.put('/api/myapp/ctl/live', { 'code': 0 }).then(response => {
        console.log(response.body)
        Store.commit('liveMode/setLiveMode', false)
        this.liveModeLoading = false
      }, response => {
        // error callback
        console.log(response.body)
      })
    }
  }
</script>

<style>
  .header_item_custom {
    margin-right: 1rem;
  }
</style>
