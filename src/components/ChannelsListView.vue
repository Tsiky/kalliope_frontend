<template>
  <div class="channels-list-view">
    <h1 class="ui header">Channels</h1>
    <table class="ui padded table">
      <thead><tr>
        <th>Name</th>
        <th>Description</th>
        <th>Selection</th>
      </tr></thead>
      <tbody>
      <tr v-if="channels.length === 0">
        <td>No channel registered</td>
      </tr>
      <tr v-for="channel in channels">
        <td>{{ channel.name }}</td>
        <td>{{ channel.description }}</td>
        <td>
          <button v-if="channel.id === selectedChannel.id" v-on:click="selectChannel(channel)" class="ui positive icon button" title="Select">
            <i class="selected radio icon"></i>
          </button>
          <button v-else v-on:click="selectChannel(channel)" class="ui icon button" title="Select">
            <i class="radio icon"></i>
          </button>
          <button v-on:click="showDeleteModal(channel)" class="ui icon button" title="Delete">
            <i class="trash icon"></i>
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

    <!-- Delete modal -->
    <modal v-model="showModal">
      <p slot="header">Delete channel</p>
      <p slot="content">Are you sure you want to permanently remove the channel "{{ channelToDeleteName }}" ?</p>
      <template slot="actions">
        <div class="ui red cancel button" @click="showModal=false">
          No
        </div>
        <div class="ui green ok right button" @click="removeChannel()">
          Yes
        </div>
      </template>
    </modal>
  </div>
</template>

<script>
  import Store from '../store/StoreVuex.vue'
  import modal from 'vue-semantic-modal'
  export default {
    name: 'ChannelsListView',
    components: {
      modal
    },
    data () {
      return {
        'channelToDeleteName': '',
        'channelToDeleteId': '',
        'showModal': false
      }
    },
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
      showDeleteModal: function (channel) {
        this.channelToDeleteName = channel.name
        this.channelToDeleteId = channel.id
        this.showModal = true
      },
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
          alert('Error')
        })
      },
      removeChannel: function () {
        this.$http.delete('/api/myapp/v1/customers/' + this.selectedUser + '/channels/' + this.channelToDeleteId).then(response => {
          Store.commit('channels/removeChannel', this.channelToDeleteId)
          this.showModal = false
        }, response => {
          // error callback
          console.log(response.body)
          alert('Error')
        })
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
