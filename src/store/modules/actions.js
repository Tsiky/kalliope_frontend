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
  }
}

const mutations = {
  setActions (state, value) {
    state.actions = value
  },
  addAction (state, value) {
    state.actions.push(value)
  },
  removeAction (state, index) {
    state.actions.splice(index, 1)
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations
}
