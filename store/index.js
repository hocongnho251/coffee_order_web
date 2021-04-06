import { GetterTree, ActionTree, MutationTree } from 'vuex'


const state = () => {
  const data = {
    isLogged: false
  }
  //
  return data
}

const getters = {
  isLogged: state => state.isLogged
}

const mutations = {
  SET_LOGGED: (state, val) => (state.isLogged = val),
}

const actions = {
  async nuxtServerInit({ getters }, { $api }) {
    // init
  }
}

export { state, actions, mutations, getters }
