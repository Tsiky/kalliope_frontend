<template>
  <div class="triggers-view">
    <h1 class="ui header">Triggers</h1>

    <table class="ui padded table">
      <thead>
      <tr><th>Sensor</th>
        <th>Operator</th>
        <th>Value</th>
        <th>Actions</th>
      </tr></thead>
      <tbody>
      <tr v-for="(value, key) in triggers">
        <td>{{ value.sensor }}</td>
        <td>{{ value.operator }}</td>
        <td>{{ value.value}}</td>
        <td>
          <button v-on:click="removeTrigger(key)" class="ui icon red button">
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
          <select v-model="newSensor">
            <option v-for="sensor in sensors" :value="sensor">{{ sensor }}</option>
          </select>
        </div>
        <div class="field">
          <label>Operator</label>
          <select v-model="newOperator">
            <option v-for="operator in operators" :value="operator">{{ operator }}</option>
          </select>
        </div>
        <div class="field">
          <label>Value</label>
          <input v-model="newValue" type="number">
        </div>
      </div>
    </div>
    <button v-on:click="addTrigger" class="ui primary labeled icon button">
      <i class="add icon"></i>
      Add rule
    </button>
  </div>
</template>

<script>
  export default {
    name: 'TriggersView',
    data () {
      return {
        sensors: ['Temperature 1', 'Temperature 2', 'Light 1'],
        operators: ['>', '<'],
        triggers: [{
          sensor: 'Temperature 1',
          operator: '>',
          value: 10
        },
        {
          sensor: 'Light 1',
          operator: '<',
          value: 20
        }],
        newSensor: '',
        newOperator: '',
        newValue: ''
      }
    },
    methods: {
      addTrigger: function () {
        if (this.newSensor !== '' && this.newOperator !== '' && this.newValue !== '') {
          this.triggers.push({
            'sensor': this.newSensor,
            'operator': this.newOperator,
            'value': this.newValue
          })
          this.newSensor = ''
          this.newOperator = ''
          this.newValue = ''
        }
      },
      removeTrigger: function (index) {
        this.triggers.splice(index, 1)
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
