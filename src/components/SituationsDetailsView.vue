<template>
  <div class="situations-detail-view">
    <h1 class="ui header">Details of situation '{{ situation.name }}'</h1>

    <h4 class="ui horizontal divider header">
      <i class="block layout icon"></i>
      Actions
    </h4>
    <div class="ui cards">
      <div v-for="(value, key) in actionsOfSituation" class="ui card">
        <div class="content">
          <div class="header">{{ getPositionInArray(key) + 1}}. {{ value.name }}</div>
          <div class="description">
            {{ value.module }} : {{ value.value }}
          </div>
        </div>
        <div class="ui bottom attached fluid buttons">
          <div v-on:click="launchAction(key)" v-bind:class="{ disabled: !liveMode }" class="ui icon button">
            <i class="play icon"></i>
          </div>
        </div>
      </div>
    </div>

    <div class="situations-details-buttons">
      <router-link to='/situations/'>
        <button class='ui labeled icon button'>
          <i class='chevron left icon'></i>
          Back
        </button>
      </router-link>
      <button v-on:click="goToUpdateView()" class="ui labeled icon button">
        <i class='setting icon'></i>
        Edit
      </button>
    </div>
  </div>
</template>

<script>
  //  import $ from 'jquery'
  import Store from '../store/StoreVuex.vue'
  import Router from '../router/index'
  export default {
    name: 'SituationsDetailsView',
    computed: {
      situation: function () {
        return Store.getters['situations/getSituation'](this.$route.params.key)
      },
      actionsOfSituation: function () {
        return Store.getters['actions/getMultipleActions'](this.situation.actions)
      },
      liveMode: function () {
        return Store.getters['liveMode/getLiveMode']
      },
      selectedUser: function () {
        return Store.getters['users/getSelectedUser']
      }
    },
    methods: {
      goToUpdateView: function () {
        if (this.$route.params.key) {
          Router.push({ path: `/situations/update/${this.$route.params.key}` })
        }
      },
      getPositionInArray: function (key) {
        return this.situation.actions.indexOf(key)
      },
      launchAction: function (index) {
        this.$http.post('/api/myapp/action?user=' + this.selectedUser, { 'name': this.actionsOfSituation[index].name }).then(response => {
        }, response => {
          // error callback
          console.log(response.body)
        })
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .situations-details-buttons {
    margin-top: 1.5rem;
  }
  .divider {
    margin-top: 3rem;
    margin-bottom: 3rem;
  }
</style>
