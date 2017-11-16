<script>
  import Vuex from 'vuex'
  import Vue from 'vue'
  import createPersistedState from 'vuex-persistedstate'
//  import * as Cookies from 'js-cookie'
  import actions from './modules/actions'
  import liveMode from './modules/liveMode'

  Vue.use(Vuex)
  export default new Vuex.Store({
    strict: true,
    modules: {
      actions,
      liveMode
    },
    plugins: [
      // Save state in cookie
//      createPersistedState({
//        getState: (key) => Cookies.getJSON(key),
//        setState: (key, state) => Cookies.set(key, state, { expires: 3, secure: false })
//      })
      // Save state in session storage
//      createPersistedState({ storage: window.sessionStorage })
      // Save state in local storage
      createPersistedState({ storage: window.localStorage })
    ]
  })
</script>
