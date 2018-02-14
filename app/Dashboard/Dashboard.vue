<template>
  <div class="uk-container uk-padding">
    <h1>Dashboard</h1>
    {{privateChannelCache}}
    <div uk-grid>
      <div class="uk-width-1-3@m">
        <div class="uk-alert uk-alert-default">
          <p>Private channels: 3</p>

          <span v-for="pc in privateChannels"  v-if="privateChannels">
            {{ pc.name }}
          </span>
        </div>
      </div>
      <div class="uk-width-2-3@m">
        <ul class="uk-breadcrumb" v-if="this.channelTree.backup">
            <li><a href="#">@{{user.username}}</a></li>
            <li v-for="item in this.channelTree.backup">
              <a href="#">{{ item.name }}</a>
            </li>
        </ul>

        <table>
          <tr colspan="2">
            <ChannelItem :node="channelTree.data" :level="1" :history="!!this.channelTree.backup.length" :resetTree="resetTree"/>
          </tr>
        </table>

      </div>
    </div>
  </div>
</template>

<script>
import Util from '../Util'
import ChannelItem from './ChannelItem'
var _ = require('lodash')

// demo data
var data = {
  name: 'a483n4c (Default)',
  children: [
    { name: 'A1', score: 2},
    { name: 'A2', score: 5},
    {
      name: 'C1',
      score: 3,
      children: [
        {
          name: 'C2',
          score: 100,
          children: [
            { name: 'AX', score: 1 },
            { name: 'AY', score: 3 }
          ]
        },
        { name: 'A3', score: 200},
        { name: 'A4', score: 300 },
        {
          name: 'CX',
          score: 250,
          children: [
            { name: 'A5', score: 9},
            { name: 'A6', score: 5 }
          ]
        }
      ]
    }
  ]
}

export default {
  store: [
    'user',
    'messages',
    'channelTree'
  ],
  mounted() {
    console.log("Dashboard mounted")
    this.channelTree.data = data

    Util.user.get('channels').map().on(this.addPrivateChannel)

    Util.gun.get('channels').val(function(name, key) {
      console.log(name, key)
    })

    Util.gun.get('channels').map().on(function(name) {
      console.log("Map", name)
    })

    // Util.gun.get('channel/92cbedb5-8d77-5db0-b6e8-fd8277d58cb6').val(function(channel, key) {
    //   console.log("Channel data", channel)
    // })
    Util.channels.map().on(function(channel,key) {
      console.log("Pub Channel data", channel, key)
    })
  },
  components: {
    ChannelItem
  },
  data() {
    return {
      privateChannelCache: []
    }
  },
  methods: {
    resetTree: function() {
      this.channelTree.data = this.channelTree.backup.pop()
    },
    addPrivateChannel: function(data, key) {
      console.log("Private channel!", data)
      if(key && data.title) {
        data.key = key
        this.privateChannelCache[key] = data
      }
    }
  },
  computed: {
    privateChannels: function() {
      var privateChannels = _.keyBy(this.privateChannelCache, 'key')
      return privateChannels
    }
  }
}
</script>
