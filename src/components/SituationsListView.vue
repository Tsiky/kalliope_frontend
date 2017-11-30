<template>
  <div class="situations-list-view">
    <h1 class="ui header">Situations</h1>

    <div class="ui grid">
      <div class="row">
        <div class="ui cards">
          <div v-for="(value, key) in situations" class="ui card">
            <div class="content">
              <div class="header">{{ value.name }}</div>
              <div class="description">
                <div class="ui bulleted list">
                  <div v-for="action in value.actions" class="item">{{ action }}</div>
                </div>
              </div>
            </div>
            <div class="ui three bottom attached fluid buttons">
              <div v-on:click="goToDetailsView(key)" class="ui icon button">
                <i class="info icon"></i>
              </div>
              <div v-on:click="goToUpdateView(key)" class="ui icon button">
                <i class="setting icon"></i>
              </div>
              <div v-on:click="" class="ui icon button">
                <i class="trash icon"></i>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="row">
        <router-link to="/situations/create">
          <button class="ui primary labeled icon button">
            <i class="add icon"></i>
            Add situation
          </button>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
  import Store from '../store/StoreVuex.vue'
  import Router from '../router/index'
  export default {
    name: 'SituationsListView',
    computed: {
      situations: function () {
        return Store.getters['situations/getSituations']
      }
    },
    created: function () {
      // Get actions from API
      this.$http.get('/api/myapp/situation').then(response => {
        if (response.body) {
          Store.commit('situations/setSituations', response.body)
        } else {
          Store.commit('situations/setSituations', {})
        }
      }, response => {
        // error callback
        console.log(response.body)
      })
    },
    methods: {
      goToDetailsView: function (key) {
        Router.push({ path: `/situations/details/${key}` })
      },
      goToUpdateView: function (key) {
        Router.push({ path: `/situations/update/${key}` })
      }

    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
