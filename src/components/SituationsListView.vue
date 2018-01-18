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
                <div class="ui ordered list">
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
              <div v-on:click="showDeleteModal(key)" class="ui icon button">
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
    <!-- Delete modal -->
    <div class="ui basic modal situations-delete-modal">
      <div class="ui icon header">
        <i class="trash icon"></i>
        Delete action
      </div>
      <div class="content modal-content">
        <p>Are you sure you want to permanently remove the situation "{{ situationToDeleteName }}" ?</p>
      </div>
      <div class="actions center">
        <div class="ui red cancel inverted button">
          <i class="remove icon"></i>
          No
        </div>
        <div v-on:click="removeSituation()" class="ui green ok inverted button">
          <i class="checkmark icon"></i>
          Yes
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import $ from 'jquery'
  import Store from '../store/StoreVuex.vue'
  import Router from '../router/index'
  export default {
    name: 'SituationsListView',
    data () {
      return {
        'situationToDeleteName': ''
      }
    },
    computed: {
      situations: function () {
        return Store.getters['situations/getSituations']
      },
      selectedUser: function () {
        return Store.getters['users/getSelectedUser']
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
      },
      showDeleteModal: function (index) {
        this.situationToDeleteName = this.situations[index].name
        $('.situations-delete-modal').modal('show')
      },
      removeSituation: function () {
        if (this.situationToDeleteName !== null) {
          this.$http.delete('/api/myapp/situation', {params: { 'name': this.situationToDeleteName }}).then(response => {
            Store.commit('situations/removeSituation', this.situationToDeleteName)
          }, response => {
            // error callback
            console.log(response.body)
          })
        }
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
