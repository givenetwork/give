<template>
  <div class="uk-container uk-padding">
    <h1>Channels</h1>

    <ChannelList :channels="channelList" />

  </div>
</template>

<script>
import Util from '../Util'
import ChannelList from './ChannelList'
var _ = require('lodash');

export default {
  store: [
    'channels',
    'messages'
  ],
  data() {
    return {
      loading: true,
      channelCache: []
    }
  },
  methods: {
    // addChannel: function(data, key) {
    //   console.log(data, key)
    //   // Check if data is an object
    //   // if(!!key && typeof data == 'object') {
    //     this.channelCache.push(data)
    //   // }
    // }
  },
  // beforeMount() {
  //   // Util.channels.map().on(this.addChannel)
  // },
  components: {
    ChannelList
  },
  computed: {
    // channelList: function() {
    //   return _.keyBy(this.channelCache, 'id')
    // }
  }
}
</script>
