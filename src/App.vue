<template>
  <div id="app">

    <div class="ui visible left vertical inverted sidebar thin labeled menu">
      <router-link to="/">
        <a class="item">
          <i class="home icon"></i>
          Home
        </a>
      </router-link>
      <a class="item">
        <i class="comments icon"></i>
        Channels
      </a>
      <router-link to="/triggers">
        <a class="item">
          <i class="configure icon"></i>
          Triggers
        </a>
      </router-link>
    </div>
    <div class="pusher">
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
