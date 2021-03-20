const admin = {
  state: {
    isLogin: false,
    info: {
      adminID: null,
      adminName: null,
      avatarURL: null,
      email: null
    }
  },
  mutations: {
    isLogin: function (state, isLogin) {
      state.isLogin = isLogin
    },
    info: function (state, info) {
      state.info = info
    }
  }
}

export default admin
