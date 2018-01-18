// Store for triggers

// const state = {
//   'triggers': {
//     'testtriger': {
//       'name': 'testtriger',
//       'content': 'testsensor == 1 AND sensor2 < 32.12 OR sensor3 > 42 => testaction'
//     }
//   }
// }

const state = {
  'triggers': {}
}

const getters = {
  getTriggers: state => {
    return state.triggers
  },
  getMultipleTriggers: state => (keys) => {
    let selectedTriggers = {}
    for (let i in keys) {
      selectedTriggers[keys[i]] = state.triggers[keys[i]]
    }
    return selectedTriggers
  }
}

const mutations = {
  setTriggers (state, value) {
    state.triggers = value
  },
  setTrigger (state, value) {
    state.triggers[value.name] = value
  },
  addTrigger (state, value) {
    if (value.name) {
      state.triggers[value.name] = value
    }
  },
  removeTrigger (state, value) {
    delete state.triggers[value]
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations
}
