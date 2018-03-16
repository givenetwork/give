import Ipfs from 'ipfs'
import StellarSdk from 'stellar-sdk'
import { STELLAR_SERVER_URL, ROOT_ORG_PATH, GUN_DB_URL } from './Constants'
var _ = require('lodash');
var shortHash = require('short-hash');
var md5 = require('md5.js')

const debug = false
const stellarServer = new StellarSdk.Server(STELLAR_SERVER_URL)
      , shajs = require('sha.js')
      , uuidv5 = require('uuid/v5')

const uuidvRoot = uuidv5(ROOT_ORG_PATH, uuidv5.DNS)
      , salt = 'letsgivemore'
      , pbkdf2 = require('pbkdf2')

// Seeds / Strings etc.

// const gun = Gun(GUN_DB_URL)
// const publicGun = Gun(GUN_DB_URL)
const ipfs = new Ipfs()

// var user = gun.user()
// var channels = gun.get('channels')

// var node = gun.get('channel/fd47ac6c/link')
// var nodeTarget = gun.get('channel/fd47ac6c')
// var node = gun.get('channel/fd47ac6c/link').get('link').set(nodeTarget)
// channels.set(node)

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

  // gun: gun,
  // user: user,
  // publicGun: publicGun,
  // channels: channels,
  stellarSdk: StellarSdk,
  stellarServer: stellarServer,
  ipfs: ipfs,
  uuidvRoot: uuidvRoot,
  createChannel(channel) {

    // if(channel.private) {
    //   channel.handle = shortHash('channel_' + Math.random())
    // }
    // var channelOrgPath = ROOT_ORG_PATH + '/channel/' + channel.handle
    // channel.id = shortHash(channelOrgPath)
    //
    // var channelShortPath = 'channel/' + channel.id
    //
    // console.log("Writing channel node", channelShortPath)
    // var publicNode = publicGun.get(channelShortPath).put(channel)
    //
    // console.log("Adding channel to owner's list")
    // user.get('channels').get(channel.id).put(publicNode)
    //
    // if(!channel.private) {
    //   console.log("Preparing link node")
    //   var linkNode = publicGun.get(channelShortPath + '/link').put({
    //     active: 1
    //   })
    //   publicGun.get(channelShortPath + '/link').get('link').set(publicNode)
    //   console.log("Adding channel to global group")
    //   publicGun.get('channels').set(linkNode)
    // }

  }

}

export default Util;
