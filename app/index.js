'use strict'

import VueRouter from 'vue-router'
import App from './App.vue'

import About from './Pages/About.vue'
import Account from './Account/Account.vue'
import Channels from './Channels/Channels.vue'
import Channel from './Channels/Channel.vue'
import Dashboard from './Dashboard/Dashboard.vue'

Vue.use(VueRouter)

Vue.config.productionTip = false

const routes = [
  {path: '/', component: About},
  {path: '/account', component: Account, children: [
      { path: 'login', component: Account, meta: { title: 'Login'}},
      { path: 'signup', component: Account, meta: { title: 'Register'} }
  ]
  },
  {path: '/channels', component: Channels},
  {path: '/channels/:id/:action', component: Channel},
  {path: '/dashboard', component: Dashboard},
]

const router = new VueRouter({
  routes // short for `routes: routes`
})

window.onload = () => {
  /* eslint-disable */
  new Vue({
    /* eslint-enable */
    components: { App },
    el: 'app',
    router
  });
};

if (module.hot) {
  module.hot.accept();
}
