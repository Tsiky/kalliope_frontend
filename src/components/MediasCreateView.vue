<template>
  <div class="medias-create-view">
    <h1 class="ui header">Create media</h1>

    <form action="#">
      <div class="field">
        <label for="file" class="ui icon button">
          <i class="file icon"></i>
          Open File</label>
        <input ref="fileInput" type="file" id="file" style="display:none">
      </div>

      <div class="field">
        <label>Type</label>
        <select v-model="deviceFilter" class="ui dropdown medias-create-dropdown">
          <option>all</option>
          <option>uboard</option>
          <option>smartphone</option>
        </select>
      </div>
    </form>
    <!--<p>Select the XML file you want to import:</p>-->
    <!--<div class="file-field input-field">-->
    <!--<div class="btn light-blue darken-1">-->
    <!--<span>File</span>-->
    <!--<input ref="fileInput" name= "workflowFile" type="file">-->
    <!--</div>-->
    <!--<div class="file-path-wrapper">-->
    <!--<input class="file-path validate" type="text">-->
    <!--</div>-->
    <!--</div>-->

    <div class="medias-create-buttons">
      <router-link to='/medias/'>
        <button class='ui labeled icon button'>
          <i class='chevron left icon'></i>
          Back
        </button>
      </router-link>
      <!--<button v-on:click='addMedia()' v-bind:class="{ loading: loading }" class='ui primary labeled icon button'>-->
      <button v-on:click='addMedia()' class='ui primary labeled icon button'>
        <i class='checkmark icon'></i>
        Create
      </button>
    </div>

  </div>
</template>

<script>
  import $ from 'jquery'
  import Store from '../store/StoreVuex.vue'
  export default {
    name: 'MediasCreateView',
    data () {
      return {
        'deviceFilter': ''
      }
    },
    computed: {
      selectedChannel: function () {
        return Store.getters['channels/getSelectedChannel']
      },
      selectedUser: function () {
        return Store.getters['users/getSelectedUser']
      }
    },
    mounted: function () {
      $('.medias-create-dropdown').dropdown()
    },
    methods: {
      addMedia: function () {
        console.log(this.$refs.fileInput.files)
        let files = this.$refs.fileInput.files
        let data = new FormData()
        data.append('file', files[0])
        data.append('device_filter', this.deviceFilter)
        this.$http.post('/api/myapp/v1/customers/' + this.selectUser + '/channels/' + this.selectChannel.id + '/medias', data).then(response => {
          console.log(response.body)
        }, response => {
          console.log(response.body)
        })
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .medias-create-buttons {
    margin-top: 4rem;
    margin-bottom: 2rem;
  }
</style>
