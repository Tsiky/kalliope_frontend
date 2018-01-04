<template>
  <div class="channels-view">
    <h1 class="ui header">Channels</h1>

  </div>
</template>

<script>
  export default {
    name: 'ChannelsView',

    created: function () {
      // this.$http.get('/api/myapp/v1/channels').then(response => {
      //   console.log(response.body)
      // }, response => {
      //   // error callback
      //   console.log(response.body)
      // })
      // Get channels from API
      // this.$http.headers.common['Access-Control-Allow-Origin'] = true
      // this.$http.jsonp('https://kapi.iglor.es/v1/channels').then(response => {
      //   console.log(response.body)
      //   console.log('NO ERROR')
      // }, response => {
      //   // error callback
      //   console.log('ERROR')
      //   console.log(response)
      //   console.log(response.body)
      // })

      // this.$http.jsonp('https://kapi.iglor.es/v1/channels').then(function (data) {
      //   console.log(data.json())
      // }, function (error) {
      //   console.log(error)
      //   // handle errors
      // })

      // this.$http.headers.common['Access-Control-Allow-Origin'] = '*'
      // this.$http.headers.common['Access-Control-Request-Method'] = '*'
      // this.$http.get('https://kapi.iglor.es/v1/channels').then(response => {
      //   console.log(response.body)
      //   console.log('NO ERROR')
      // }, response => {
      //   // error callback
      //   console.log('ERROR')
      //   console.log(response.headers)
      //   console.log(response.request)
      // })
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
