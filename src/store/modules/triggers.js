// Store for triggers

// const state = {
//   'triggers': [{
//     'sensor': 'Temperature 1',
//     'operator': '>',
//     'value': 10
//   }, {
//     'sensor': 'Light 1',
//     'operator': '<',
//     'value': 20
//   }]
// }

const state = {
  'triggers': []
}

const getters = {
  getTriggers: state => {
    return state.triggers
  }
}

const mutations = {
  setTriggers (state, value) {
    state.triggers = value
  },
  addTrigger (state, newTrigger) {
    state.triggers.push({
      'sensor': newTrigger.sensor,
      'operator': newTrigger.operator,
      'value': newTrigger.value
    })
  },
  removeTrigger (state, index) {
    state.triggers.splice(index, 1)
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations
}
