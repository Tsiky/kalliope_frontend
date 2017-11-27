<template>
  <div class="situations-create-view">
    <h1 class="ui header">Create situation</h1>

    <div class='ui form'>
      <div class='field'>
        <label>Name</label>
        <input v-model='nameValue' type='text'>
      </div>
      <div class="field">
        <label>Actions</label>
        <div class="ui list">
          <div v-for="action in actionsValue" class="item">
            <button v-on:click="removeAction(action)" class="ui icon mini negative button" title="Delete">
              <i class="trash icon"></i>
            </button>
            {{ action }}
          </div>
        </div>
        <div class="fields">
          <div class="fourteen wide field">
            <select v-model='actionName' class='ui dropdown situations-create-dropdown'>
              <option v-for='name in actionsName' :value='name'>
                {{ name }}
              </option>
            </select>
          </div>
          <div class="two wide field">
            <button v-on:click='addAction()' v-bind:class="{ loading: loading }" class='ui primary labeled icon button'>
              <i class='add icon'></i>
              Add
            </button>
          </div>
        </div>
      </div>

    </div>
    <div class="situations-create-buttons">
      <router-link to='/situations/'>
        <button class='ui labeled icon button'>
          <i class='chevron left icon'></i>
          Back
        </button>
      </router-link>
      <button v-on:click='addSituation()' v-bind:class="{ loading: loading }" class='ui primary labeled icon button'>
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
    name: 'SituationsCreateView',
    data () {
      return {
        'nameValue': '',
        'actionsValue': [],
        'actionName': '',
        'loading': false
      }
    },
    computed: {
      actionsName: function () {
        let actions = Store.getters['actions/getActions']
        let names = []
        for (let action in actions) {
          if (!this.actionsValue.includes(action)) {
            names.push(action)
          }
        }
        return names
      }
    },
    created: function () {
      // Get actions from API
      this.$http.get('/api/myapp/action').then(response => {
        if (response.body) {
          Store.commit('actions/setActions', response.body)
        } else {
          Store.commit('actions/setActions', {})
        }
      }, response => {
        // error callback
        console.log(response.body)
      })
    },
    mounted: function () {
      $('.situations-create-dropdown').dropdown()
    },
    methods: {
      addSituation: function () {
        if (this.nameValue !== '') {
          this.loading = true
          let newSituation = {
            'name': this.nameValue,
            'actions': this.actionsValue
          }

          this.$http.put('/api/myapp/situation', newSituation).then(response => {
            console.log(response.body)
            Store.commit('situations/addSituation', newSituation)
            this.loading = false
            Router.push({path: '/situations'})
          }, response => {
            // error callback
            console.log(response.body)
            this.loading = false
          })
        }
      },
      addAction: function () {
        if (this.actionName && !this.actionsValue.includes(this.actionName)) {
          this.actionsValue.push(this.actionName)
          this.actionName = ''
          $('.situations-create-dropdown').dropdown('clear')
        }
      },
      removeAction: function (actionName) {
        if (actionName) {
          this.actionsValue.splice(this.actionsValue.indexOf(actionName), 1)
        }
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .situations-create-buttons {
    margin-top: 1.5rem;
  }
</style>
