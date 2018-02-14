import request from 'request'
import Ipfs from 'ipfs'
import StellarSdk from 'stellar-sdk'
import { STELLAR_SERVER_URL, ROOT_ORG_PATH, GUN_DB_URL } from './Constants'
var _ = require('lodash');

const debug = false
const stellarServer = new StellarSdk.Server(STELLAR_SERVER_URL)
      , shajs = require('sha.js')
      , uuidv5 = require('uuid/v5')

const uuidvRoot = uuidv5(ROOT_ORG_PATH, uuidv5.DNS)
      , salt = 'letsgivemore'
      , pbkdf2 = require('pbkdf2')

// Seeds / Strings etc.

const gun = Gun(GUN_DB_URL)
const ipfs = new Ipfs()

var channels = gun.get('channels')

// localStorage.clear()

// gun.get('channels/12345').put({ hidden: true })
// gun.get('channel/12345').put({ hidden: false })
// gun.get('channels/6789').put({ hidden: true })
// gun.get('channel/6789').put({ hidden: false })
// gun.get('channels').put({})
// var c1 = gun.get('channels/12345').put({ title: "Chan ONE", description: "SOmeotherstuff", id: '4354gfe' })
// var c2 = gun.get('channels/6789').put({ title: "DOIS", description: "Onds aa eo zouff", id: '9jdkn847' })
// channels.set(c1);
// channels.set(c2);

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
    debug && console.log("IPFS Browser Peer Ready", identity)
  })
})

const Util = {

  gun: gun,
  user: gun.user(),
  channels: channels,
  stellarSdk: StellarSdk,
  stellarServer: stellarServer,
  ipfs: ipfs,
  uuidvRoot: uuidvRoot

}

export default Util;
