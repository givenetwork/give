<template>
  <div>
    <div class="uk-container uk-padding">
      <h1>Dashboard</h1>
    </div>

    <ChannelTree :node="channelTree" />

  </div>
</template>

<script>
import Util from '../Util'
import ChannelTree from './ChannelTree'
var _ = require('lodash')

// demo data
var data = {
  name: 'a483n4c (Default)',
  canEdit: true,
  children: [
    { name: '@mikefair', score: 2, type: 'user' },
    { name: '@klemen', score: 5, type: 'user' },
    {
      name: '#greenpeace',
      score: 3,
      type: 'channel',
      children: [
        {
          name: '#greenpeace-east',
          score: 100,
          type: 'channel',
          canEdit: true,
          children: [
            { name: '@waf3901', score: 1, type: 'user' },
            { name: '@boona4900003', score: 3, type: 'user' }
          ]
        },
        { name: '@alligatorguy', score: 200, type: 'user'},
        { name: '@janegoodall', score: 300, type: 'user' },
        {
          name: '#gp-west',
          score: 250,
          type: 'channel',
          canEdit: true,
          children: [
            { name: '@nonrra', score: 9, type: 'user'},
            { name: '@good4all', score: 5, type: 'user' }
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
  beforeMount() {
    this.channelTree = data
  },
  mounted() {
    // console.log("Dashboard mounted")

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
    ChannelTree
  },
  data() {
    return {
      privateChannelCache: []
    }
  },
  methods: {
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

if (module.hot) {
  module.hot.accept();
}
</script>
