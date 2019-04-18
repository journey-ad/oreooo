import Vue from 'vue'
import App from './App.vue'
import store from './store'
import i18n from './i18n'
import './registerServiceWorker'

Vue.config.productionTip = false

i18n.locale = store.state.lang
i18n.fallbackLocale = 'zh_cn'

new Vue({
  store,
  i18n,
  render: h => h(App)
}).$mount('#app')
