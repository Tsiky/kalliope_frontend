<template>
  <div class="actions-list-view">
    <h1 class="ui header">Actions</h1>
    <div class="ui grid">
      <div class="row">
        <div class="ui cards">
          <div v-for="(value, key) in actions" class="ui card">
            <div class="content">
              <div class="header">{{ value.name }}</div>
              <div class="description">
                {{ value.module }} : {{ value.value }}
              </div>
            </div>
            <div class="ui three bottom attached fluid buttons">
              <div v-on:click="testAction(key)" v-bind:class="{ disabled: !liveMode }" class="ui icon button">
                <i class="play icon"></i>
              </div>
              <div v-on:click="goToUpdateView(key)" class="ui icon button">
                <i class="setting icon"></i>
              </div>
              <div v-on:click="showDeleteModal(key)" class="ui icon button">
                <i class="trash icon"></i>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="row">
        <router-link to="/actions/create">
          <button class="ui primary labeled icon button">
            <i class="add icon"></i>
            Add action
          </button>
        </router-link>
      </div>
    </div>
    <!-- Delete modal -->
    <modal v-model="showModal">
      <p slot="header">Delete action</p>
      <p slot="content">Are you sure you want to permanently remove the action "{{ actionToDeleteName }}" ?</p>
      <template slot="actions">
        <div class="ui red cancel button" @click="showModal=false">
          No
        </div>
        <div class="ui green ok right button" @click="removeAction()">
          Yes
        </div>
      </template>
    </modal>
  </div>
</template>

<script>
  import Store from '../store/StoreVuex.vue'
  import Router from '../router/index'
  import modal from 'vue-semantic-modal'
  export default {
    name: 'ActionsListView',
    components: {
      modal
    },
    data () {
      return {
        'actionToDeleteName': '',
        'showModal': false
      }
    },
    computed: {
      actions: function () {
        return Store.getters['actions/getActions']
      },
      liveMode: function () {
        return Store.getters['liveMode/getLiveMode']
      },
      selectedUser: function () {
        return Store.getters['users/getSelectedUser']
      }
    },
    created: function () {
      // Get actions from API
      this.$http.get('/api/myapp/action').then(response => {
        if (response.body) {
          Store.commit('actions/setActions', response.body)
        } else {
          Store.commit('actions/setActions', {})
        }
      }, response => {
        // error callback
        console.log(response.body)
      })
    },
    methods: {
      showDeleteModal: function (index) {
        this.actionToDeleteName = this.actions[index].name
        this.showModal = true
      },
      removeAction: function () {
        if (this.actionToDeleteName !== null) {
          this.$http.delete('/api/myapp/action', {params: { 'name': this.actionToDeleteName }}).then(response => {
            Store.commit('actions/removeAction', this.actionToDeleteName)
            this.showModal = false
          }, response => {
            // error callback
            console.log(response.body)
            alert('Error')
          })
        }
      },
      testAction: function (index) {
        this.$http.post('/api/myapp/action?user=' + this.selectedUser, { 'name': this.actions[index].name }).then(response => {
        }, response => {
          // error callback
          console.log(response.body)
          alert('Error')
        })
      },
      goToUpdateView: function (key) {
        Router.push({ path: `/actions/update/${key}` })
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
