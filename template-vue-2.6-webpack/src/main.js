import Vue from 'vue'
import App from './App.vue'

import '@/assets/styles/index.css'

console.log('main.js test')

new Vue({
  render: (h) => h(App),
}).$mount('#app')
