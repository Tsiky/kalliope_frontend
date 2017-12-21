<template>
  <div class="triggers-view">
    <h1 class="ui header">Triggers</h1>

    <table class="ui padded table">
      <thead>
      <tr><th>Sensor</th>
        <th>Operator</th>
        <th>Value</th>
        <th></th>
      </tr></thead>
      <tbody>
      <tr v-for="(value, key) in triggers">
        <td>{{ value.sensor }}</td>
        <td>{{ value.operator }}</td>
        <td>{{ value.value}}</td>
        <td>
          <button class="ui icon button" title="Edit">
            <i class="setting icon"></i>
          </button>
          <button v-on:click="removeTrigger(key)" class="ui icon button" title="Delete">
            <i class="trash icon"></i>
          </button>
        </td>
      </tr>
      </tbody>
    </table>

    <div class="ui form">
      <div class="three fields">
        <div class="field">
          <label>Sensor</label>
          <select v-model='newSensor' class='ui dropdown triggers-dropdown'>
            <option v-for='sensor in sensors' :value='sensor'>
              {{ sensor }}
            </option>
          </select>
        </div>
        <div class="field">
          <label>Operator</label>
          <select v-model='newOperator' class='ui dropdown triggers-dropdown'>
            <option v-for='operator in operators' :value='operator'>
              {{ operator }}
            </option>
          </select>
        </div>
        <div class="field">
          <label>Value</label>
          <input v-model="newValue" type="number">
        </div>
      </div>
    </div>
    <button v-on:click="addTrigger" v-bind:class="{ disabled: !canAddTrigger }" class="ui primary labeled icon button">
      <i class="add icon"></i>
      Add rule
    </button>
  </div>
</template>

<script>
  import $ from 'jquery'
  import Store from '../store/StoreVuex.vue'
  export default {
    name: 'TriggersView',
    data () {
      return {
        'sensors': ['Temperature 1', 'Temperature 2', 'Light 1'],
        'operators': ['>', '<'],
        'newSensor': '',
        'newOperator': '',
        'newValue': ''
      }
    },
    computed: {
      triggers: function () {
        return Store.getters['triggers/getTriggers']
      },
      canAddTrigger: function () {
        return this.newSensor !== '' && this.newOperator !== '' && this.newValue !== ''
      }
    },
    mounted: function () {
      $('.triggers-dropdown').dropdown()
    },
    methods: {
      addTrigger: function () {
        if (this.canAddTrigger) {
          let newTrigger = {
            'sensor': this.newSensor,
            'operator': this.newOperator,
            'value': this.newValue
          }
          Store.commit('triggers/addTrigger', newTrigger)
          this.newSensor = ''
          this.newOperator = ''
          this.newValue = ''
          $('.triggers-dropdown').dropdown('clear')
        }
      },
      removeTrigger: function (index) {
        Store.commit('triggers/removeTrigger', index)
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
