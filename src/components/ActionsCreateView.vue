<template>
  <div class='actions-create-view'>
    <h1 class='ui header'>Create action</h1>
    <div class='ui form'>
      <div class='field'>
        <label>Label</label>
        <input v-model='labelValue' type='text'>
      </div>
      <div class='field'>
        <label>Type</label>
        <select v-model='typeKey' class='ui dropdown actions-create-dropdown'>
          <option v-for='(value, key) in types' :value='key'>
            {{ value }}
          </option>
        </select>
      </div>
      <div class='field'>
        <label>Name</label>
        <!-- Value isnt always updated -->
        <select v-model='nameKey' class='ui dropdown actions-create-dropdown'>
          <option v-for='(value, key) in names[typeKey]' :value='key'>
            {{ value }}
          </option>
        </select>
      </div>
      <div v-if="typeKey === 0 && nameKey === 0">
        <div class="ui divider"></div>
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
    </div>

    <div class="actions-create-buttons">
      <router-link to='/actions/'>
        <button class='ui labeled icon button'>
          <i class='chevron left icon'></i>
          Back
        </button>
      </router-link>
      <button v-on:click='addAction()' v-bind:class="{ loading: loading }" class='ui primary labeled icon button'>
        <i class='checkmark icon'></i>
        Create
      </button>
    </div>
  </div>
</template>

<script>
  import $ from 'jquery'
  import Store from '../store/StoreVuex.vue'
  import Router from '../router/index'
  export default {
    name: 'ActionsCreateView',
    data () {
      return {
        'labelValue': '',
        'textValue': '',
        'backgroundColorValue': '',
        'vibrationValue': '',
        'typeKey': 0,
        'types': ['multimedia', 'quiz', 'color', 'hardware', 'webview', 'arduino', 'scene control', 'update'],
        'nameKey': 0,
        'names': [
          ['text', 'video', 'streaming', 'audio', 'image'],
          ['question', 'answer'],
          ['color'],
          ['torch'],
          ['url'],
          ['HIGH', 'LOW'],
          ['scene_activate', 'scene_sendkeystroke'],
          ['medias', 'gps']],
        'loading': false
      }
    },
    mounted: function () {
      $('.actions-create-dropdown').dropdown()
    },
    watch: {
      typeKey: function () {
        // Reset name select
        this.nameKey = 0
      }
    },
    methods: {
      addAction: function () {
        if (this.labelValue !== '') {
          this.loading = true
          let newAction = {
            'name': this.labelValue,
            'module': this.types[this.typeKey],
            'value': this.names[this.typeKey][this.nameKey],
            'data': {
              'file': this.textValue,
              'vibration': this.vibrationValue !== '' ? this.vibrationValue : 0,
              'background-color': this.backgroundColorValue
            },
            'aref': 'string',
            'situation': 'situationTest'
          }

          this.$http.put('/api/myapp/action', newAction).then(response => {
            console.log(response.body)
            Store.commit('actions/addAction', newAction)
            this.loading = false
            Router.push({ path: '/actions' })
          }, response => {
            // error callback
            console.log(response.body)
            this.loading = false
          })
        }
      }
    }
  }
</script>

<!-- Add 'scoped' attribute to limit CSS to this component only -->
<style scoped>
  .actions-create-buttons {
    margin-top: 1.5rem;
  }
</style>
