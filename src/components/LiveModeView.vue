<template>
  <div class="live-mode-view">
    <button v-on:click="toggleLiveMode()" v-bind:class="{ positive: liveMode, loading: liveModeLoading }" class="ui labeled icon button">
      <i class="power icon"></i>
      Live Mode
    </button>
  </div>
</template>

<script>
  import Store from '../store/StoreVuex.vue'
  export default {
    name: 'LiveModeView',
    data () {
      return {
        'liveModeLoading': false
      }
    },
    computed: {
      liveMode: function () {
        return Store.getters['liveMode/getLiveMode']
      },
      selectedUser: function () {
        return Store.getters['users/getSelectedUser']
      }
    },
    created: function () {
      // Init live mode off when launching app
      this.$http.put('/api/myapp/ctl/live?user=' + this.selectedUser, { 'code': 0 }).then(response => {
        Store.commit('liveMode/setLiveMode', false)
        this.liveModeLoading = false
      }, response => {
        // error callback
        console.log(response.body)
      })
    },
    methods: {
      toggleLiveMode: function () {
        this.liveModeLoading = true
        let data = { 'code': 1 }
        if (this.liveMode) {
          data = { 'code': 0 }
        }
        this.$http.put('/api/myapp/ctl/live?user=' + this.selectedUser, data).then(response => {
          Store.commit('liveMode/setLiveMode', !this.liveMode)
          this.liveModeLoading = false
        }, response => {
          // error callback
          console.log(response.body)
          this.liveModeLoading = false
        })
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .live-mode-view {
    float: left;
    margin-top: 0.4rem;
  }
</style>
