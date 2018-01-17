<template>
  <div class="situations-update-view">
    <h1 class="ui header">Update situation '{{ situation.name }}'</h1>

    <h4 class="ui horizontal divider header">
      <i class="block layout icon"></i>
      Actions
    </h4>
    <div class='ui form'>
      <div class="field">
        <label>Available actions</label>
        <div class="fields">
          <div class="fourteen wide field">
            <select v-model='actionName' class='ui search dropdown situations-update-dropdown'>
              <option v-for='name in actionsName' :value='name'>
                {{ name }}
              </option>
            </select>
          </div>
          <div class="two wide field">
            <button v-on:click='addAction()' class='ui primary labeled icon button'>
              <i class='add icon'></i>
              Add
            </button>
          </div>
        </div>
      </div>
    </div>
    <div class="ui cards">
      <div v-for="(value, key) in actionsOfSituation" class="ui card">
        <div class="content">
          <div class="header">{{ getPositionInArray(key) + 1}}. {{ value.name }}</div>
          <div class="description">
            {{ value.module }} : {{ value.value }}
          </div>
        </div>
        <div class="ui bottom attached fluid buttons">
          <div v-on:click="moveToLeft(getPositionInArray(key))" class="ui icon button">
            <i class="chevron left icon"></i>
          </div>
          <div v-on:click="removeAction(getPositionInArray(key))" class="ui icon button">
            <i class="remove icon"></i>
          </div>
          <div v-on:click="moveToRight(getPositionInArray(key))" class="ui icon button">
            <i class="chevron right icon"></i>
          </div>
        </div>
      </div>
    </div>


    <div class="situations-update-buttons">
      <router-link to='/situations/'>
        <button class='ui labeled icon button'>
          <i class='chevron left icon'></i>
          Back
        </button>
      </router-link>
      <button v-on:click='updateSituation()' class='ui primary labeled icon button'>
        <i class='checkmark icon'></i>
        Update
      </button>
    </div>
  </div>
</template>

<script>
  import $ from 'jquery'
  import Store from '../store/StoreVuex.vue'
  import Router from '../router/index'
  export default {
    name: 'SituationsUpdateView',
    data () {
      return {
        'newActionsList': [],
        'actionName': ''
      }
    },
    computed: {
      situation: function () {
        return Store.getters['situations/getSituation'](this.$route.params.key)
      },
      actionsOfSituation: function () {
        return Store.getters['actions/getMultipleActions'](this.newActionsList)
      },
      actionsName: function () {
        let actions = Store.getters['actions/getActions']
        let names = []
        for (let action in actions) {
          if (!this.newActionsList.includes(action)) {
            names.push(action)
          }
        }
        return names
      }
    },
    created: function () {
      this.newActionsList = Object.assign([], this.situation.actions)
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
      $('.situations-update-dropdown').dropdown()
    },
    methods: {
      getPositionInArray: function (key) {
        return this.newActionsList.indexOf(key)
      },
      updateSituation: function () {
        this.loading = true
        let newSituation = {
          'name': this.situation.name,
          'actions': this.newActionsList
        }

        this.$http.put('/api/myapp/situation', newSituation).then(response => {
          Store.commit('situations/setSituation', newSituation)
          this.loading = false
          Router.push({ path: `/situations/details/${this.$route.params.key}` })
        }, response => {
          // error callback
          console.log(response.body)
          this.loading = false
        })
      },
      addAction: function () {
        if (this.actionName && !this.newActionsList.includes(this.actionName)) {
          this.newActionsList.push(this.actionName)
          this.actionName = ''
          $('.situations-update-dropdown').dropdown('clear')
        }
      },
      removeAction: function (position) {
        this.newActionsList.splice(position, 1)
      },
      moveToLeft: function (position) {
        if (position > 0) {
          let temp = this.newActionsList[position - 1]
          this.$set(this.newActionsList, position - 1, this.newActionsList[position])
          this.$set(this.newActionsList, position, temp)
        }
      },
      moveToRight: function (position) {
        if (position < this.newActionsList.length - 1) {
          let temp = this.newActionsList[position + 1]
          this.$set(this.newActionsList, position + 1, this.newActionsList[position])
          this.$set(this.newActionsList, position, temp)
        }
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .situations-update-buttons {
    margin-top: 1.5rem;
  }
  .divider {
    margin-top: 3rem;
    margin-bottom: 1rem;
  }
</style>
