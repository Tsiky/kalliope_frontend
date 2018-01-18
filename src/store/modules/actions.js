// Store for actions

// var mockActions = [{
//   'label': 'Blue screen',
//   'type': 'color',
//   'name': 'color'
// }, {
//   'label': 'Red screen',
//   'type': 'color',
//   'name': 'color'
// }, {
//   'label': 'First quizz',
//   'type': 'quizz',
//   'name': 'question'
// }, {
//   'label': 'Second quizz',
//   'type': 'quizz',
//   'name': 'answer'
// }]

const state = {
  'actions': []
}

const getters = {
  getActions: state => {
    return state.actions
  },
  getAction: state => (key) => {
    return state.actions[key]
  },
  getMultipleActions: state => (keys) => {
    let selectedActions = {}
    for (let i in keys) {
      selectedActions[keys[i]] = state.actions[keys[i]]
    }
    return selectedActions
  }
}

const mutations = {
  setActions (state, value) {
    state.actions = value
  },
  setAction (state, value) {
    state.actions[value.name] = value
  },
  addAction (state, value) {
    // state.actions.push(value)
    if (value.name) {
      state.actions[value.name] = value
    }
  },
  removeAction (state, value) {
    delete state.actions[value]
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations
}
