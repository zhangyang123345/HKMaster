export default {
  namespaced: true,
  state: {
    id: 0,
    name: '',
    realname: ''
  },
  mutations: {
    updateId (state, id) {
      state.id = id
    },
    updateName (state, name) {
      state.name = name
    },
    updateRealname (state, name) {
      state.realname = name
    }
  }
}
