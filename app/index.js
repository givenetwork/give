'use strict'

import 'babel-polyfill'
import VueRouter from 'vue-router'
import App from './App.vue'

import About from './Pages/About.vue'
import Account from './Account/Account.vue'
import Channels from './Channels/Channels.vue'
import Channel from './Channels/Channel.vue'
import Dashboard from './Dashboard/Dashboard.vue'

import VueStash from 'vue-stash'
Vue.use(VueStash)
Vue.use(VueRouter)

Vue.config.productionTip = false

const routes = [
  {path: '/', component: About},
  {path: '/account/login', component: Account, meta: { title: 'Login'}},
  {path: '/account/signup', component: Account, meta: { title: 'Create New Account'}},
  {path: '/channels', component: Channels, children: [
      { path: 'new', component: Channel },
      { path: ':id', component: Channel },
    ]
  },
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
    data: {
      store: {
          user: false,
          messages: {
            list: [],
            setMessage(message, messageClass="danger") {
              this.list.push({ message: message, class: messageClass })
            },
            clearMessage(index) {
              this.list.splice(index)
            }
          }
      }
    },
    methods: {

    },
    router
  });
};

if (module.hot) {
  module.hot.accept();
}
