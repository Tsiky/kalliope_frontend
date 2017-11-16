// Store for liveMode

const state = {
  'liveMode': false
}

const getters = {
  getLiveMode: state => {
    return state.liveMode
  }
}

const mutations = {
  setLiveMode (state, value) {
    state.liveMode = value
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations
}
