// Store for users

const state = {
  'users': [],
  'selectedUser': 'upc'
}

const getters = {
  getUsers: state => {
    return state.users
  },
  getSelectedUser: state => {
    return state.selectedUser
  }
}

const mutations = {
  setUsers (state, value) {
    state.users = value
  },
  setSelectedUser (state, value) {
    state.selectedUser = value
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations
}
