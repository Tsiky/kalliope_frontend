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

      <!-- multimedia - text -->
      <div v-if="names[typeKey][nameKey] === 'text'">
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
      <!-- multimedia - video & audio -->
      <div v-else-if="names[typeKey][nameKey] === 'video' || names[typeKey][nameKey] === 'audio'">
        <div class="ui divider"></div>
        <div class='field'>
          <label>File</label>
          <!-- Does not exist when mounted so jquery css doesnt apply -->
          <select v-model='fileValue' class='ui dropdown actions-create-dropdown'>
            <option v-for='media in medias' :value='media.name'>
              {{ media.name }}
            </option>
          </select>
        </div>
        <div class='field'>
          <label>Vibration</label>
          <input v-model='vibrationValue' type='number' step='0.1'>
        </div>
      </div>
      <!-- multimedia - image -->
      <div v-if="names[typeKey][nameKey] === 'image'">
        <div class="ui divider"></div>
        <div class='field'>
          <label>File</label>
          <!-- Does not exist when mounted so jquery css doesnt apply -->
          <select v-model='fileValue' class='ui dropdown actions-create-dropdown'>
            <option v-for='media in medias' :value='media.name'>
              {{ media.name }}
            </option>
          </select>
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
      <!-- color - color -->
      <div v-if="names[typeKey][nameKey] === 'color'">
        <div class="ui divider"></div>
        <div class='field'>
          <label>Color</label>
          <input v-model='colorValue' type='text'>
        </div>
        <div class='field'>
          <label>Seconds</label>
          <input v-model='secondsValue' type='number' step='1'>
        </div>
        <div class='field'>
          <label>Vibration</label>
          <input v-model='vibrationValue' type='number' step='0.1'>
        </div>
      </div>

      <div class="ui divider"></div>
      <div class="field">
        <label>Filters</label>
        <textarea v-model="filtersValue" rows="2"></textarea>
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
        'fileValue': '',
        'filtersValue': '',
        'colorValue': '',
        'secondsValue': '',
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
        'medias': [],
        'loading': false
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
    created: function () {
      this.$http.get('/api/myapp/v1/customers/' + this.selectedUser + '/channels/' + this.selectedChannel.id + '/medias').then(response => {
        if (response.body) {
          this.medias = response.body.fields
        }
      }, response => {
        // error callback
        console.log(response.body)
      })
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
          let newAction = {}
          switch (this.names[this.typeKey][this.nameKey]) {
            case 'text':
              newAction = {
                'name': this.labelValue,
                'module': this.types[this.typeKey],
                'value': this.names[this.typeKey][this.nameKey],
                'data': {
                  'file': this.textValue,
                  'vibration': this.vibrationValue !== '' ? this.vibrationValue : 0,
                  'background-color': this.backgroundColorValue
                },
                'aref': 'string',
                'situation': 'FirstSituation'
              }
              break
            case 'image':
              newAction = {
                'name': this.labelValue,
                'module': this.types[this.typeKey],
                'value': this.names[this.typeKey][this.nameKey],
                'data': {
                  'file': this.fileValue,
                  'vibration': this.vibrationValue !== '' ? this.vibrationValue : 0,
                  'background-color': this.backgroundColorValue
                },
                'aref': 'string',
                'situation': 'FirstSituation'
              }
              break
            case 'color':
              newAction = {
                'name': this.labelValue,
                'module': this.types[this.typeKey],
                'value': this.names[this.typeKey][this.nameKey],
                'data': {
                  'color': [{
                    'color': this.colorValue,
                    'seconds': this.secondsValue
                  }],
                  'vibration': this.vibrationValue !== '' ? this.vibrationValue : 0
                },
                'aref': 'string',
                'situation': 'FirstSituation'
              }
              break
            default:
              newAction = {
                'name': this.labelValue,
                'module': this.types[this.typeKey],
                'value': this.names[this.typeKey][this.nameKey],
                'data': {
                  'file': this.textValue,
                  'vibration': this.vibrationValue !== '' ? this.vibrationValue : 0,
                  'background-color': this.backgroundColorValue
                },
                'aref': 'string',
                'situation': 'FirstSituation'
              }
              break
          }
          if (this.filtersValue !== '') {
            if (this.isJsonString(this.filtersValue)) {
              newAction['filters'] = JSON.parse(this.filtersValue)
            } else {
              alert('Invalid filters')
              this.loading = false
              return
            }
          }

          this.$http.put('/api/myapp/action', newAction).then(response => {
            Store.commit('actions/addAction', newAction)
            this.loading = false
            Router.push({ path: '/actions' })
          }, response => {
            // error callback
            console.log(response.body)
            alert('Error')
            this.loading = false
          })
        }
      },
      isJsonString: function (str) {
        try {
          JSON.parse(str)
        } catch (e) {
          return false
        }
        return true
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
