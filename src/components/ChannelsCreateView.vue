<template>
  <div class="channels-create-view">
    <h1 class="ui header">Create channel</h1>

    <div class='ui form'>
      <div class='field'>
        <label>Name</label>
        <input v-model='name' type='text'>
      </div>
      <div class='field'>
        <label>Description</label>
        <input v-model='description' type='text'>
      </div>
      <div class='field'>
        <label>Icon URL</label>
        <input v-model='iconUrl' type='url'>
      </div>
      <div class='field'>
        <label>Documentation URL</label>
        <input v-model='documentationUrl' type='url'>
      </div>
    </div>

    <div class="channels-create-buttons">
      <router-link to='/channels/'>
        <button class='ui labeled icon button'>
          <i class='chevron left icon'></i>
          Back
        </button>
      </router-link>
      <button v-on:click='addChannel()' v-bind:class="{ loading: loading }" class='ui primary labeled icon button'>
        <i class='checkmark icon'></i>
        Create
      </button>
    </div>
  </div>
</template>

<script>
  import Consts from '../store/consts/Consts'
  import Router from '../router/index'
  export default {
    name: 'ChannelsCreateView',
    data () {
      return {
        'name': '',
        'description': '',
        'iconUrl': '',
        'documentationUrl': '',
        'loading': false
      }
    },
    methods: {
      addChannel: function () {
        this.loading = true
        let newChannel = {
          'name': this.name,
          'description': this.description,
          'iconUrl': this.iconUrl,
          'documentationUrl': this.documentationUrl,
          'distance': 0
        }
        this.$http.post('/api/myapp/v1/customers/' + Consts.KALLIOPE_USER + '/channels/', newChannel).then(response => {
          this.loading = false
          Router.push({ path: '/channels' })
        }, response => {
          this.loading = false
          console.log(response.body)
        })
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .channels-create-buttons {
    margin-top: 1.5rem;
  }
</style>
