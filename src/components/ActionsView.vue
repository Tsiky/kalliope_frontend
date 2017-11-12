<template>
  <div class="actions-view">
    <h1 class="ui header">Actions</h1>

  </div>
</template>

<script>
  export default {
    name: 'ActionsView',
    mounted: function () {
      this.$http.get('/api/get/workflows').then(response => {
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
