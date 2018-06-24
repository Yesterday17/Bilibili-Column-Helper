const state = {
  page: 1
}

const mutations = {
  SET_PAGE: function (state, page) {
    state.page = page
  }
}

export default {
  state,
  mutations
}
