<template>
  <div class="uk-padding">

    <form class="uk-form-width-large uk-align-center" @submit.prevent>

        <h2>{{ title }}</h2>

        <div uk-alert>

          <div class="uk-margin">
            <input class="uk-input" v-model="channel.name" type="text" placeholder="Channel name">
          </div>

          <div class="uk-margin">
            <textarea class="uk-textarea" v-model="channel.description" placeholder="Description"></textarea>
          </div>

          <div class="uk-margin uk-grid-small uk-child-width-auto uk-grid">
            <label><input class="uk-checkbox" type="checkbox" v-model="channel.private"> Channel is Private</label>
          </div>

          <button class="uk-button uk-button-primary uk-width-1-1" @click="submit">{{ action }}</button>

        </div>

    </form>
  </div>
</template>

<script>
import Util from '../Util'
const uuidv5 = require('uuid/v5')
const gun = Util.gun
const user = Util.user
const channels = Util.channels

export default {
  data: function() {
    return {
      title: 'New Channel',
      channel: {
        name: '',
        description: '',
        private: 1
      },
      action: 'Save Channel'
    }
  },
  store: [
    'user'
  ],
  created() {
    if(!this.user) {
        this.$router.push("/account/login")
    }
  },
  methods: {
    submit() {
      var channelUuid = uuidv5(this.channel.name, Util.uuidvRoot)
      var channelKey = 'channel/' + channelUuid

      console.log("Writting channel node", channelUuid)
      var channelNode = gun.get(channelKey).put({
        name: this.channel.name,
        descrpition: this.channel.description,
        private: this.channel.private
      })
      console.log("Written", channelNode)

      // console.log("Setting channel owner")
      // channelNode.path('owner').key(user.key)

      console.log("Adding channel to owner's list")
      user.get('channels').set(channelNode)
      if(!this.channel.private) {
        console.log("Adding channel to global group")
        channels.set(channelNode)
      }
    }
  }
}
</script>
