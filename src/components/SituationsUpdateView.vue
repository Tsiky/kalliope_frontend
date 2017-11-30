<template>
  <div class="situations-update-view">
    <h1 class="ui header">Update situation '{{ situation.name }}'</h1>
    <router-link to="/situations/">
      <button class="ui labeled icon button">
        <i class="chevron left icon"></i>
        Back
      </button>
    </router-link>
    <button v-on:click="updateSituation()" class="ui primary labeled icon button">
      <i class="checkmark icon"></i>
      Update
    </button>
  </div>
</template>

<script>
  //  import $ from 'jquery'
  import Store from '../store/StoreVuex.vue'
  import Router from '../router/index'
  export default {
    name: 'SituationsUpdateView',
    data () {
      return {
        'situation': ''
      }
    },
    created: function () {
      if (this.$route.params.key) {
        this.situation = Store.getters['situations/getSituation'](this.$route.params.key)
      }
    },
    methods: {
      updateSituation: function () {
        if (this.$route.params.key) {
          Router.push({ path: `/situations/details/${this.$route.params.key}` })
        }
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
