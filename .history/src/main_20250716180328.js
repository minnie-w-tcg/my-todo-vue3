import Vue from 'vue';
import App from './App.vue';
import store from './store'; // 引入 Vuex store

new Vue({
  store, // 注入 Vuex store
  render: h => h(App), // 渲染 App.vue 元件
}).$mount('#app'); 