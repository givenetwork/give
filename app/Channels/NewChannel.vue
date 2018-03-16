<template>
  <div class="uk-padding">

    <form class="uk-form-width-large uk-align-center" @submit.prevent>

        <div uk-alert>

          <div class="uk-margin" v-if="!channel.private">
            <div class="uk-inline uk-width-1-1">
              <span class="uk-form-icon" uk-icon="icon: hashtag"></span>
              <input class="uk-input" v-model="channel.handle" v-bind:class="{ 'uk-form-danger' : errors.has('handle') }" type="text" name="handle" placeholder="mychannel" v-validate="'required|alpha_dash'">
            </div>
            <small v-show="errors.has('handle')" class="uk-text-danger">{{ errors.first('handle') }}</small>
          </div>

          <div class="uk-margin">
            <input class="uk-input" v-model="channel.title" v-bind:class="{ 'uk-form-danger' : errors.has('name') }" type="text" name="name" placeholder="Channel name" v-validate="'required'">
            <small v-show="errors.has('name')" class="uk-text-danger">{{ errors.first('name') }}</small>
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
      channel: {
        title: '',
        handle: '',
        description: '',
        private: 0
      },
      action: 'Edit Channel'
    }
  },
  store: [
    'user'
  ],
  // created() {
  //   if(!this.user) {
  //       this.$router.push("/account/login")
  //   }
  // },
  methods: {
    submit() {
      Util.createChannel(this.channel)
    }
  }
}
</script>
