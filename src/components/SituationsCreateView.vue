<template>
  <div class="situations-create-view">
    <h1 class="ui header">Create situation</h1>

    <div class='ui form'>
      <div class='field'>
        <label>Name</label>
        <input v-model='nameValue' type='text'>
      </div>

      <h4 class="ui horizontal divider header">
        <i class="block layout icon"></i>
        Actions
      </h4>
      <div class="field">
        <label>Available actions</label>
        <div class="fields">
          <div class="fourteen wide field">
            <select v-model='actionForm' class='ui search dropdown situations-create-dropdown-actions'>
              <option v-for='name in actionsName' :value='name'>
                {{ name }}
              </option>
            </select>
          </div>
          <div class="two wide field">
            <button v-on:click='addAction()' v-bind:class="{ disabled: actionForm === '' || actionForm === undefined, loading: loading }" class='ui primary labeled icon button'>
              <i class='add icon'></i>
              Add
            </button>
          </div>
        </div>
      </div>
      <div class="ui cards">
        <div v-for="(value, key) in selectedActions" class="ui card">
          <div class="content">
            <div class="header">{{ getPositionInArrayActions(key) + 1}}. {{ value.name }}</div>
            <div class="description">
              {{ value.module }} : {{ value.value }}
            </div>
          </div>
          <div class="ui three bottom attached fluid buttons">
            <div v-on:click="moveToLeft(getPositionInArrayActions(key))" class="ui icon button">
              <i class="chevron left icon"></i>
            </div>
            <div v-on:click="removeAction(getPositionInArrayActions(key))" class="ui icon button">
              <i class="remove icon"></i>
            </div>
            <div v-on:click="moveToRight(getPositionInArrayActions(key))" class="ui icon button">
              <i class="chevron right icon"></i>
            </div>
          </div>
        </div>
      </div>

      <h4 class="ui horizontal divider header">
        <i class="pointing right chart icon"></i>
        Triggers
      </h4>
      <div class="field">
        <label>Content</label>
        <textarea v-model="triggerFormContent" rows="2"></textarea>
      </div>
      <div class="field">
        <label>Name</label>
        <div class="fields">
          <div class="fourteen wide field">
            <input v-model='triggerFormName' type='text'>
          </div>
          <div class="two wide field">
            <button v-on:click='addTrigger()' v-bind:class="{ disabled: triggerFormContent === '' || triggerFormName === '', loading: loading }" class='ui primary labeled icon button'>
              <i class='add icon'></i>
              Add
            </button>
          </div>
        </div>
      </div>
    </div>
    <div class="ui cards">
      <div v-for="(value, key) in selectedTriggers" class="ui card">
        <div class="content">
          <div class="header">{{ value.name }}</div>
          <div class="description">
            {{ truncateString(value.content) }}
          </div>
        </div>
        <div class="ui bottom attached fluid buttons">
          <div v-on:click="removeTrigger(getPositionInArrayTriggers(key))" class="ui icon button">
            <i class="remove icon"></i>
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
        'actionForm': '',
        'triggersValue': [],
        'triggerFormName': '',
        'triggerFormContent': '',
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
      triggers: function () {
        return Store.getters['triggers/getTriggers']
      },
      selectedActions: function () {
        return Store.getters['actions/getMultipleActions'](this.actionsValue)
      },
      selectedTriggers: function () {
        return Store.getters['triggers/getMultipleTriggers'](this.triggersValue)
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
      $('.situations-create-dropdown-actions').dropdown()
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
        if (this.actionForm && !this.actionsValue.includes(this.actionForm)) {
          this.actionsValue.push(this.actionForm)
          this.actionForm = ''
          $('.situations-create-dropdown-actions').dropdown('clear')
        }
      },
      removeAction: function (position) {
        this.actionsValue.splice(position, 1)
      },
      getPositionInArrayActions: function (key) {
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
      },
      addTrigger: function () {
        let newTrigger = {
          'name': this.triggerFormName,
          'content': this.triggerFormContent
        }
        this.loading = true
        this.$http.put('/api/myapp/trigger', newTrigger).then(response => {
          this.loading = false
          Store.commit('triggers/addTrigger', newTrigger)
          this.triggersValue.push(this.triggerFormName)
          this.triggerFormName = ''
          this.triggerFormContent = ''
        }, response => {
          // error callback
          console.log(response.body)
          this.loading = false
        })
      },
      removeTrigger: function (position) {
        this.triggersValue.splice(position, 1)
      },
      getPositionInArrayTriggers: function (key) {
        return this.triggersValue.indexOf(key)
      },
      truncateString: function (str) {
        if (str.length > 110) {
          return str.substring(0, 110) + '…'
        } else {
          return str
        }
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .situations-create-buttons {
    margin-top: 4rem;
    margin-bottom: 2rem;
  }
  .divider {
    margin-top: 4rem;
    margin-bottom: 2rem;
  }
</style>
