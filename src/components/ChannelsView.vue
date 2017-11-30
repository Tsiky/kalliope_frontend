<template>
  <div class="channels-view">
    <h1 class="ui header">Channels</h1>

  </div>
</template>

<script>
  export default {
    name: 'ChannelsView',

    created: function () {
      // Get channels from API
      this.$http.jsonp('http://kapi.iglor.es/v1/channels').then(response => {
        console.log(response.body)
      }, response => {
        // error callback
        console.log(response.body)
      })
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
