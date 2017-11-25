<template>
  <div class="situations-list-view">
    <h1 class="ui header">Situations</h1>
    <div class="row">
      <router-link to="/situations/create">
        <button class="ui primary labeled icon button">
          <i class="add icon"></i>
          Add situation
        </button>
      </router-link>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'SituationsListView'
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
