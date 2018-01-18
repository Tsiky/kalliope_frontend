<template>
  <div class="channels-list-view">
    <h1 class="ui header">Channels</h1>
    <table class="ui padded table">
      <thead><tr>
        <th>Name</th>
        <th>Description</th>
        <th></th>
      </tr></thead>
      <tbody>
      <tr v-if="channels.length === 0">
        <td>No channel registered</td>
      </tr>
      <tr v-for="channel in channels">
        <td>{{ channel.name }}</td>
        <td>{{ channel.description }}</td>
        <td>
          <button v-if="channel.id === selectedChannel.id" class="ui positive icon button" title="Select">
            <i class="selected radio icon"></i>
          </button>
          <button v-else v-on:click="selectChannel(channel)" class="ui icon button" title="Select">
            <i class="radio icon"></i>
          </button>
        </td>
      </tr>
      </tbody>
    </table>

    <router-link to="/channels/create">
      <button class="ui primary labeled icon button">
        <i class="add icon"></i>
        Add channel
      </button>
    </router-link>
  </div>
</template>

<script>
  import Store from '../store/StoreVuex.vue'
  export default {
    name: 'ChannelsListView',
    computed: {
      channels: function () {
        return Store.getters['channels/getChannels']
      },
      selectedChannel: function () {
        return Store.getters['channels/getSelectedChannel']
      },
      selectedUser: function () {
        return Store.getters['users/getSelectedUser']
      }
    },
    created: function () {
      this.$http.get('/api/myapp/v1/customers/' + this.selectedUser + '/channels/').then(response => {
        Store.commit('channels/setChannels', response.body.fields)
      }, response => {
        // error callback
        console.log(response.body)
      })
    },
    methods: {
      selectChannel: function (channel) {
        let channelData = {
          'id': channel.id,
          'name': channel.name,
          'messagesScopeUrl': channel.messagesScopeUrl,
          'user': this.selectedUser
        }
        this.$http.post('/api/myapp/channel', channelData).then(response => {
          Store.commit('channels/setSelectedChannel', channel)
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

</style>
