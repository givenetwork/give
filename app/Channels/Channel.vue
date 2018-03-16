<template>
  <div class="uk-background-muted">

      <div class="uk-text-center uk-padding">

        <h2>
          <form @submit="loadChannel" @submit.prevent v-if="!isNew">
            <input v-model="loadChannelId" name="loadChannelId" type="text" class="uk-input uk-padding-small uk-text-center" placeholder="Channel ID / URL" key="loadChannel" />
          </form>

          <input v-model="channelTree.name" name="channelName" type="text" class="uk-input uk-padding-small uk-text-center" placeholder="Channel name" key="newChannel" v-if="isNew" />
        </h2>
        <a @click.stop="newChannel" v-if="!isNew && !channelTree.entries">Start from scratch</a>

      </div>

      <template v-if="channelTree && channelTree.entries">

        <span class="uk-float-right uk-margin-medium-right" @click="viewCode=!viewCode" v-if="channelTree && channelTree.entries">
          <a class="uk-button" v-bind:class="{ 'uk-button-primary': !viewCode, 'uk-button-default': viewCode }"><span class="uk-icon" uk-icon="social"></span></a>
          <a class="uk-button" v-bind:class="{ 'uk-button-primary': viewCode, 'uk-button-default': !viewCode }"><span class="uk-icon" uk-icon="code"></span></a>
        </span>

        <template v-if="!viewCode">
          <ChannelTree :node="channelTree" />

            <form class="uk-grid-small uk-grid uk-padding uk-background-dark" uk-grid>
              <input v-model="entryId" name="entryId" type="text" class="uk-input uk-width-2-3" placeholder="Paste GIVE ID or URL" />
              <a @click.stop="addNewEntry" class="uk-button uk-button-primary uk-width-1-3 uk-margin-remove">Add Entry</a>
            </form>
        </template>

        <div class="uk-padding" v-else>
          <a class="uk-button uk-width-1-1 uk-button-primary uk-margin-top">Copy to Clipboard</a>
          <code><textarea class="uk-textarea" v-model="beautifiedTree" rows="20" /></code>
        </div>

      </template>

  </div>
</template>

<script>
import axios from 'axios'
import NewChannel from './NewChannel'
import ChannelTree from './ChannelTree'
var _ = require('lodash')
var beautify = require("json-beautify")

let timer

export default {
  store: [
    'user',
    'messages'
  ],
  data() {
    return {
      pageTitle: 'Create or Load a Channel',
      loadChannelId: "",
      isNew: false,
      addEntry: false,
      channelTree: {},
      viewCode: false
    }
  },
  beforeMount() {
    // if(this.$route.params.id) != "new" {
    //   var channel = gun.get('channel/' + id)
    //   console.log(channel)
    // }
    // this.channelTree = portfolio
    // this.channelTree.canEdit = 1
    // this.pageTitle = portfolio.name
  },
  methods: {
    addNewEntry() {
      this.channelTree.entries.push({
        id: this.entryId,
        score: 1
      })
    },
    loadChannel() {
      const id = this.loadChannelId
      if(!id) return

      let url
      try {
        url = new URL(id)
      }
      catch(e) {
        url = this.parseId(id)
      }

      axios.get(url)
        .then((response) => {
          this.channelTree = response.data
          this.channelTree.id = id
          this.channelTree.canEdit = 1
        })
        .catch((error) => {
          // this.messages.setMessage("Error loading channel")
        })
    },
    parseId(id) {
      let url,
          github = id.match(/github.com\/(.*)(\/.*)?/)

      if(github && github.length && github[1]) {
        // USER/ORG
        if(github[1].indexOf("/", ) == -1) {
            url = `https://rawgit.com/${github[1]}/give/master/.give`
        }
        // REPO
        else {
            url = `https://rawgit.com/${github[1]}/master/.give`
        }
        return url;
      }

      // TODO: IPFS
      // TODO: Gitlab
      // TODO: Twitter
      // TODO: Facebook

    },
    newChannel() {
      this.isNew = true
      this.channelTree = {
          "name": this.loadChannelId || "New channel",
          "canEdit": 1,
          "entries": []
      }

    }
  },
  components: {
    NewChannel,
    ChannelTree
  },
  computed: {
    beautifiedTree() {
      var entries = []
      _.each(this.channelTree.entries, (e) => {
        entries.push({ id: e.id, score: e.score })
      })

      var outputTree = {
        name: this.channelTree.name,
        entries: entries
      }
      return beautify(outputTree, null, 2, 100)
    }
  },
  watch : {
    loadChannelId(val) {
      if(timer)
        clearTimeout(timer)
      timer = setTimeout(this.loadChannel, 1000)
    }
  }
}
</script>
