'use strict'

const VERSION = 'v0.1-poc'

import axios from 'axios'
import 'babel-polyfill'
import VueRouter from 'vue-router'
import VeeValidate from 'vee-validate'
import App from './App.vue'

import Home from './Pages/Home.vue'
import About from './Pages/About.vue'
import Account from './Account/Account.vue'
import Channels from './Channels/Channels.vue'
import Channel from './Channels/Channel.vue'
import NewChannel from './Channels/NewChannel.vue'
import Dashboard from './Dashboard/Dashboard.vue'

import VueStash from 'vue-stash'
Vue.use(VueStash)
Vue.use(VueRouter)
Vue.use(VeeValidate);

Vue.config.productionTip = false

var app

// TODO: do this better globally (for now the important components check for auth)
export function requireAuth(to, from, next) {
  next()
}

const routes = [
  {path: '*', component: Home},
  {path: '/about', component: About},
  {path: '/account/login', component: Account, meta: { title: 'Login'}},
  {path: '/account/signup', component: Account, meta: { title: 'Create New Account'}},
  {path: '/channels', component: Channels },
  {path: '/channel', component: Channel },
  // {path: '/channel/:id', component: Channel },
  // {path: '/channel/:id/:action', component: Channel},
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
          channels: {
              list: [],
              addChannel(channel) {
                this.list.push()
              }
          },
          privateChannels: {
            list: []
          },
          messages: {
            list: [],
            setMessage(message, messageClass="danger") {
              this.list.push({ message: message, class: messageClass })
            },
            clearMessage(index) {
              this.list.splice(index)
            },
            clearAll() {
              this.list = []
            }
          },
          user: false,
          version: VERSION,
      }
    },
    router
  })

};

if (module.hot) {
  module.hot.accept();
}
