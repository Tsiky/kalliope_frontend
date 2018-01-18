<template>
  <div class="menu-view">
    <div class="ui inverted segment">
      <div class="ui inverted secondary pointing menu">
        <!--<div class="header item">-->
        <img class="header_item_custom" src="../assets/small_logo.png">
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
        <router-link class="item" to="/triggers">
          Triggers
        </router-link>
        <router-link class="item" to="/users">
          Users
        </router-link>
        <router-link class="item" to="/channels">
          Channels
        </router-link>
        <router-link class="item" to="/medias">
          Medias
        </router-link>
        <div class="right menu">
          <live-mode-view></live-mode-view>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import LiveModeView from './LiveModeView.vue'
  export default {
    name: 'MenuView',
    components: { LiveModeView }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .menu-view {
    margin-bottom: 2rem;
  }
</style>
