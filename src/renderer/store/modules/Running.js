const state = {
  page: 1,
  loginStatus: 'pending'
}

const mutations = {
  SET_PAGE: function (state, page) {
    state.page = page
  },
  UPDATE_LOGIN_STATUS: function (state, status) {
    state.loginStatus = status
  }
}

export default {
  state,
  mutations
}
