<template>
  <div id="app">

    <div class="ui inverted segment">
      <div class="ui inverted secondary pointing menu">
        <!--<div class="header item">-->
          <img class="test" src="./assets/small_logo.png">
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
  export default {
    name: 'app'
  }
</script>

<style>
  .test {
    margin-right: 1rem;
  }
</style>
