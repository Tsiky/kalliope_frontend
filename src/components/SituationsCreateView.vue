<template>
  <div class="situations-create-view">
    <h1 class="ui header">Create situation</h1>

    <div class="situations-create-buttons">
      <router-link to='/situations/'>
        <button class='ui labeled icon button'>
          <i class='chevron left icon'></i>
          Back
        </button>
      </router-link>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'SituationsCreateView'
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
