// Store for channels

const state = {
  'channels': [],
  'selectedChannel': {}
}

const getters = {
  getChannels: state => {
    return state.channels
  },
  getSelectedChannel: state => {
    return state.selectedChannel
  }
}

const mutations = {
  setChannels (state, value) {
    state.channels = value
  },
  setSelectedChannel (state, value) {
    state.selectedChannel = value
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations
}
