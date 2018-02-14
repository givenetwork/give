<template>
  <div>
    <div class="uk-container uk-padding">
      <h1>Dashboard</h1>
      <!-- {{privateChannelCache}} -->
      <!-- <div uk-grid> -->
        <!-- <div class="uk-width-1-3@m">
          <div class="uk-alert uk-alert-default">
            <p>Private channels: 3</p>

            <span v-for="pc in privateChannels"  v-if="privateChannels">
              {{ pc.name }}
            </span>
          </div>
        </div> -->
        <!-- <div class="uk-width-2-3@m"> -->

        <!-- </div> -->
      <!-- </div> -->
    </div>
    <a v-if="this.channelTree.backup.length"  @click="restoreToItem" class="uk-button uk-button-secondary uk-width-1-1 button-tree-up">LEVEL UP <span class="uk-icon" uk-icon="icon: chevron-up"></span></a>
    <div class="uk-background-muted uk-padding">
      <ul class="uk-breadcrumb" v-if="this.channelTree.backup.length">
          <li v-for="(item, key) in this.channelTree.backup">
            <a href="#" @click="restoreToItem(key)">{{ item.name }}</a>
          </li>
          <li><span>{{ channelTree.data.name }}</span></li>
      </ul>
      <ChannelItem :node="channelTree.data" :level="1" />
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
    this.channelTree.data = data
  },
  mounted() {
    console.log("Dashboard mounted")

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
    resetTree() {
      this.channelTree.data = this.channelTree.backup[0]
      this.channelTree.backup = []
    },
    restoreToItem(index) {
      if(index) {
        this.channelTree.backup.splice(index, -1)
      }
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
