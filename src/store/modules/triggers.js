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
  'triggers': []
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
  addTrigger (state, value) {
    if (value.name) {
      state.triggers.push(value)
    }
  },
  removeTrigger (state, value) {
    state.triggers = state.triggers.filter(function (el) {
      return el.name !== value
    })
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations
}
