import Vue from 'vue'
import App from './app.vue'
import axios from 'axios';

const wokooApp = document.createElement('div');
wokooApp.id = 'wokooApp';
document.body.appendChild(wokooApp);
Vue.prototype.$axios = axios;
const vm = new Vue({
  el: '#wokooApp',
  render: (h) => h(App),
})
