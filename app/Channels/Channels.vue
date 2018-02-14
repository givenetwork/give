<template>
  <div class="uk-container uk-padding">
    <h1>Channels</h1>

    <div class="uk-grid-medium uk-child-width-1-2@s uk-child-width-1-4@m uk-text-center" uk-grid>
      <div v-for="channel in channelList">
        <div class="uk-card uk-card-default">
          <div class="uk-card-body">
            {{channel.title}}

            <span v-for="pc in privateChannels" v-if="privateChannels">
              {{ pc.name }}
            </span>
          </div>
          <div class="uk-card-footer">
            <router-link :to="{ path: 'channels/' + channel.id }" class="uk-button uk-button-text uk-width-1-1">View Channel</router-link>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import Util from '../Util'
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
    addChannel: function(data, key) {
      if(key && data.title) {
        data.key = key
        this.channelCache[key] = data
      }
    }
  },
  mounted() {
    Util.channels.map().on(this.addChannel)
  },
  computed: {
    channelList: function() {
      this.channels = _.chain(this.channelCache).keyBy('key').value()
      return this.channels
    }
  }
}
</script>
