import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/store'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import VueSocketIO from 'vue-socket.io';
import io from 'socket.io-client';

const SocketInstance = io.connect('http://192.168.10.10:3001');
Vue.use(new VueSocketIO({
    debug: true,
    connection: SocketInstance,
    vuex: {
      store,
      mutationPrefix: 'SOCKET_'
    },
}));


Vue.use(ElementUI);
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
