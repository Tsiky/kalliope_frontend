<template>
  <div class="actions-update-view">
    <h1 class="ui header">Update action '{{ action.name }}'</h1>

    <div v-if="show" class='ui form'>
      <div class='field'>
        <label>Text</label>
        <input v-model='textValue' type='text'>
      </div>
      <div class='field'>
        <label>Background-color</label>
        <input v-model='backgroundColorValue' type='text'>
      </div>
      <div class='field'>
        <label>Vibration</label>
        <input v-model='vibrationValue' type='number' step='0.1'>
      </div>
    </div>

    <div class="actions-update-buttons">
      <router-link to='/actions/'>
        <button class='ui labeled icon button'>
          <i class='chevron left icon'></i>
          Back
        </button>
      </router-link>
      <button v-on:click='updateAction()' v-bind:class="{ loading: loading }" class='ui primary labeled icon button'>
        <i class='checkmark icon'></i>
        Update
      </button>
    </div>
  </div>
</template>

<script>
  import Store from '../store/StoreVuex.vue'
  import Router from '../router/index'
  export default {
    name: 'ActionsUpdateView',
    data () {
      return {
        'action': '',
        'textValue': '',
        'backgroundColorValue': '',
        'vibrationValue': '',
        'loading': false
      }
    },
    computed: {
      // TEMP
      show: function () {
        return this.action.module === 'multimedia' && this.action.value === 'text'
      }
    },
    created: function () {
      if (this.$route.params.key) {
        this.action = Store.getters['actions/getAction'](this.$route.params.key)
        let data = this.action.data
        if (data) {
          this.textValue = data.file
          this.backgroundColorValue = data['background-color']
          this.vibrationValue = data.vibration
        }
      }
    },
    methods: {
      updateAction: function () {
        this.loading = true
        let updatedAction = Object.assign({}, this.action)
        updatedAction.data = {
          'file': this.textValue,
          'vibration': this.vibrationValue !== '' ? this.vibrationValue : 0,
          'background-color': this.backgroundColorValue
        }
        this.$http.put('/api/myapp/action', updatedAction).then(response => {
          Store.commit('actions/setAction', updatedAction)
          this.loading = false
          Router.push({ path: '/actions' })
        }, response => {
          // error callback
          console.log(response.body)
          alert('Error')
          this.loading = false
        })
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .actions-update-buttons {
    margin-top: 1.5rem;
  }
</style>
