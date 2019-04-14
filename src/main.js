import Vue from 'vue'
import App from './App.vue'
import i18n from './i18n'
import './registerServiceWorker'

Vue.config.productionTip = false

// Set Language
let lang = '';

if (location.hash.length > 1) {
  lang = location.hash.substring(1);
  localStorage.lang = lang;
} else if (localStorage.getItem('lang')) {
  lang = localStorage.getItem('lang');
} else {
  localStorage.lang = 'zh_cn';
  lang = 'zh_cn';
}

i18n.locale = lang
i18n.fallbackLocale = 'zh_cn'

new Vue({
  i18n,
  render: h => h(App)
}).$mount('#app')
