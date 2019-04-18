import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production',
  state: {
    lang: localStorage['lang'] ? localStorage['lang'] : 'zh_cn',
    show: { loading: true, output: false },
    images: {},
    languages: {
      中: 'zh_cn',
      En: 'en_us',
      日: 'ja_jp',
      De: 'de_de'
    },
    bgColorArr: [
      '#caad9f',
      '#f0c869',
      '#6abce0',
      '#9ac4bd',
      '#fad0c4',
      '#9ec6cd'
    ],
    sources: {
      O: require('@/assets/images/O.png'),
      R: require('@/assets/images/R.png'),
      Ob: require('@/assets/images/Ob.png')
    }
  },
  mutations: {
    setImageCache (state, images) {
      state.images = images
    },
    setShow (state, obj) {
      state.show = obj
    },
    changeLang (state, lang) {
      state.lang = lang
      localStorage.lang = state.lang;
    }
  }
})

export default store
