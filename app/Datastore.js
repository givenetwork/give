import Vue from 'vue'
import Vuex from 'vuex'
import request from 'request'
import Ipfs from 'ipfs'
import StellarSdk from 'stellar-sdk'
import { STELLAR_SERVER_URL, ROOT_ORG_PATH, GUN_DB_URL } from './Constants'

Vue.use(Vuex)

const stellarServer = new StellarSdk.Server(STELLAR_SERVER_URL)
      , shajs = require('sha.js')
      , uuidv5 = require('uuid/v5')

// Seeds / Strings etc.
const uuidvRoot = uuidv5(ROOT_ORG_PATH, uuidv5.DNS)
      , salt = 'letsgivemore'
      , pbkdf2 = require('pbkdf2')

const gun = Gun(GUN_DB_URL)
const ipfs = new Ipfs()

const user = gun.user()
const channels = gun.get('channels')
channels.on(function(data) {
  console.log('Channels updated', data)
})



// INSTANTIATE IPFS

// const ipfsOptions = {
//   EXPERIMENTAL: {
//     pubsub: true
//   },
// }

ipfs.on('error', (e) => console.log(e))
ipfs.on('ready', async () => {
  ipfs.id(function (err, identity) {
    if (err) {
      throw err
    }
    console.log("IPFS Browser Peer Ready", identity)
  })
})

// root state object.
// each Vuex instance is just a single state tree.
const state = {
  count: 0,
  user: null
}

// mutations are operations that actually mutates the state.
// each mutation handler gets the entire state tree as the
// first argument, followed by additional payload arguments.
// mutations must be synchronous and can be recorded by plugins
// for debugging purposes.
const mutations = {
  updateUser(state, user) {
    state.user = user
  },
  increment(state) {
    state.count++
  },
  decrement(state) {
    state.count--
  }
}

// actions are functions that cause side effects and can involve
// asynchronous operations.
const actions = {
  // increment: ({ commit }) => commit('increment'),
  // decrement: ({ commit }) => commit('decrement'),
  // incrementIfOdd ({ commit, state }) {
  //   if ((state.count + 1) % 2 === 0) {
  //     commit('increment')
  //   }
  // },
  login ({ commit }, data) {
    return gun.user().auth(data.username, data.password)
  }
}

// getters are functions
const getters = {
  evenOrOdd: state => state.count % 2 === 0 ? 'even' : 'odd'
}

// A Vuex instance is created by combining the state, mutations, actions,
// and getters.
export default new Vuex.Store({
  state,
  getters,
  actions,
  mutations
})
