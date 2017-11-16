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
    </div>

    <router-link to='/actions/'>
      <button class='ui labeled icon button'>
        <i class='chevron left icon'></i>
        Back
      </button>
    </router-link>
    <!--<router-link to='/actions/'>-->
    <button v-on:click='addAction()' class='ui primary labeled icon button'>
      <i class='checkmark icon'></i>
      Create
    </button>
    <!--</router-link>-->
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
        'typeKey': '0',
        'types': ['multimedia', 'quiz', 'color', 'hardware', 'webview', 'arduino', 'scene control', 'update'],
        'nameKey': '0',
        'names': [
          ['video', 'streaming', 'audio', 'image', 'text'],
          ['question', 'answer'],
          ['color'],
          ['torch'],
          ['url'],
          ['HIGH', 'LOW'],
          ['scene_activate', 'scene_sendkeystroke'],
          ['medias', 'gps']]
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
        let newAction = {
          'name': this.labelValue,
          'module': this.types[this.typeKey],
          'value': this.names[this.typeKey][this.nameKey],
          'data': {
            'file': 'Hello word !',
            'default-sound': 'sound.mp3',
            'vibration': 0.5,
            'background-color': '#020202'
          },
          'aref': 'string',
          'situation': 'situationTest'
        }

        this.$http.put('/api/myapp/action', newAction).then(response => {
          console.log(response.body)
          Store.commit('actions/addAction', newAction)
          Router.push({ path: '/actions' })
        }, response => {
          // error callback
          console.log(response.body)
        })
      }
    }
  }
</script>

<!-- Add 'scoped' attribute to limit CSS to this component only -->
<style scoped>

</style>
