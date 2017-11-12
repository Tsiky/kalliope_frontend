<template>
  <div id="app">

    <div class="ui inverted segment">
      <div class="ui inverted secondary pointing menu">
        <router-link class="item" to="/">
          Home
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
    <router-view/>

    </div>
  </div>
</template>

<script>
  export default {
    name: 'app'
  }
</script>

<style>
</style>
