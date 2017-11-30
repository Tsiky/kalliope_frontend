<template>
  <div id="app">

    <menu-view></menu-view>
    <!-- Site content !-->
    <div class="ui container">
      <router-view/>
    </div>

  </div>
</template>

<script>
  import MenuView from './components/MenuView.vue'
  export default {
    name: 'app',
    components: { MenuView },
    created: function () {
      // TEMP
      this.$http.put('/api/myapp/situation', { 'name': 'FirstSituation' }).then(response => {
        console.log(response.body)
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
