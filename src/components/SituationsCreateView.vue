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
        <div class="fields">
          <div class="fourteen wide field">
            <select v-model='actionName' class='ui search dropdown situations-create-dropdown'>
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
    <div class="ui cards">
      <div v-for="(value, key) in selectedActions" class="ui card">
        <div class="content">
          <div class="header">{{ getPositionInArray(key) + 1}}. {{ value.name }}</div>
          <div class="description">
            {{ value.module }} : {{ value.value }}
          </div>
        </div>
        <div class="ui three bottom attached fluid buttons">
          <div v-on:click="moveToLeft(getPositionInArray(key))" class="ui icon button">
            <i class="chevron left icon"></i>
          </div>
          <div v-on:click="removeAction(getPositionInArray(key))" class="ui icon button">
            <i class="trash icon"></i>
          </div>
          <div v-on:click="moveToRight(getPositionInArray(key))" class="ui icon button">
            <i class="chevron right icon"></i>
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
      },
      selectedActions: function () {
        return Store.getters['actions/getMultipleActions'](this.actionsValue)
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
      removeAction: function (position) {
        this.actionsValue.splice(position, 1)
      },
      getPositionInArray: function (key) {
        return this.actionsValue.indexOf(key)
      },
      moveToLeft: function (position) {
        if (position > 0) {
          let temp = this.actionsValue[position - 1]
          this.$set(this.actionsValue, position - 1, this.actionsValue[position])
          this.$set(this.actionsValue, position, temp)
        }
      },
      moveToRight: function (position) {
        if (position < this.actionsValue.length - 1) {
          let temp = this.actionsValue[position + 1]
          this.$set(this.actionsValue, position + 1, this.actionsValue[position])
          this.$set(this.actionsValue, position, temp)
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
