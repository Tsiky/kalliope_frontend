// Store for situations

const state = {
  'situations': {}
}

const getters = {
  getSituations: state => {
    return state.situations
  },
  getSituation: state => (key) => {
    return state.situations[key]
  }
}

const mutations = {
  setSituations (state, value) {
    state.situations = value
  },
  setSituation (state, value) {
    state.situations[value.name] = value
  },
  addSituation (state, value) {
    state.situations[value.name] = value
  },
  removeSituation (state, index) {
    state.situations.splice(index, 1)
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations
}
