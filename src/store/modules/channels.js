// Store for channels

const state = {
  'channels': {}
}

const getters = {
  getChannels: state => {
    return state.channels
  }
}

const mutations = {
  setChannels (state, value) {
    state.channels = value
  },
  addSituation (state, value) {
    state.channels.push(value)
  },
  removeSituation (state, index) {
    state.channels.splice(index, 1)
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations
}
