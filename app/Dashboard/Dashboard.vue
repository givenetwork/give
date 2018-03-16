<template>
  <div>
    <div class="uk-container uk-padding">
      <h1>Dashboard</h1>

      <h3>Your channels</h3>

      <ChannelList :channels="privateChannels" />

    </div>

  </div>
</template>

<script>
import Util from '../Util'
import ChannelList from '../Channels/ChannelList'
var _ = require('lodash')

export default {
  store: [
    'user',
    'messages'
  ],
  mounted() {
    // Util.publicGun.get('channels').map().on(function(channel, key) {
    //   console.log("Pub Channel data", channel, key)
    // })

    Util.gun.user().get('channels').map(this.addPrivateChannel)
  },
  components: {
    ChannelList
  },
  data() {
    return {
      privateChannelCache: []
    }
  },
  methods: {
    addPrivateChannel: function(data, key) {
      this.privateChannelCache.push(data)
      // if(key && data.title) {
      //   data.key = key
      //   this.privateChannelCache[key] = data
      // }
    }
  },
  computed: {
    privateChannels: function() {
      var privateChannels = _.keyBy(this.privateChannelCache, 'id')
      return privateChannels
    }
  }
}
</script>
