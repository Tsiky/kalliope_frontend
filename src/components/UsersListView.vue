<template>
  <div class="users-list-view">
    <h1 class="ui header">Users</h1>
    <table class="ui padded table">
      <thead><tr>
        <th>Name</th>
        <th></th>
      </tr></thead>
      <tbody>
      <tr v-for="user in users">
        <td>{{ user.username }}</td>
        <td>
          <button v-if="user.username === selectedUser" class="ui positive icon button" title="Select">
            <i class="selected radio icon"></i>
          </button>
          <button v-else v-on:click="selectUser(user)" class="ui icon button" title="Select">
            <i class="radio icon"></i>
          </button>
        </td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
  import Store from '../store/StoreVuex.vue'
  export default {
    name: 'UsersListView',
    computed: {
      users: function () {
        let usersSorted = []
        if (Store.getters['users/getUsers'] !== []) {
          usersSorted = Store.getters['users/getUsers'].map((b, idx) => Object.assign({ index: idx }, b)) // clone vuex array
          usersSorted.sort(this.compare)
        }
        return usersSorted
      },
      selectedUser: function () {
        return Store.getters['users/getSelectedUser']
      }
    },
    created: function () {
      this.$http.get('/api/myapp/v1/customers/').then(response => {
        Store.commit('users/setUsers', response.body.fields)
      }, response => {
        // error callback
        console.log(response.body)
      })
    },
    methods: {
      selectUser: function (user) {
        Store.commit('users/setSelectedUser', user.username)
        Store.commit('channels/setSelectedChannel', {})
      },
      compare: function (a, b) {
        if (a.username < b.username) {
          return -1
        }
        if (a.username > b.username) {
          return 1
        }
        return 0
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
