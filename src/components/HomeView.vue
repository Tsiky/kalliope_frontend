<template>
  <div class="home">
    <img src="../assets/kalliope_logo.png">
  </div>
</template>

<script>
  import $ from 'jquery'
  export default {
    name: 'HomeView',
    data () {
      return {
        msg: 'Welcome to your Kalliope dashboard'
      }
    },
    mounted: function () {
      $('.ui.modal').modal('show')
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
