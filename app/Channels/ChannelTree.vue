<template>
  <div class="channel-tree">

    <div class="uk-padding uk-padding-remove-top uk-padding-remove-bottom">
      <ul class="uk-breadcrumb uk-margin-small-top">
          <li v-if="history.length>0"><a @click="restoreToItem" class="uk-button uk-button-secondary button-tree-up"><span class="uk-icon" uk-icon="icon: chevron-left"></span></a></li>
          <li v-for="(item, key) in history" v-if="history.length">
            <a @click="restoreToItem(key)">{{ item.name }}</a>
          </li>
          <li><a @click.stop="resetTree"><small class="uk-icon" uk-icon="home"></small> {{node.name || node.id}}</a></li>
      </ul>
    </div>

    <div class="channel-tree--view">
      <!-- <div class="uk-card uk-card-default">
        <h3 class="uk-text-left uk-margin-remove-bottom">

          <a v-else class="uk-button uk-button-secondary button-tree-up"><span class="uk-icon" uk-icon="icon: hashtag"></span></a>
          <b class="uk-margin-left" v-if="!!node">{{node.name || node.id}}</b>
        </h3>
      </div> -->

      <div class="uk-background-muted uk-padding uk-padding-remove-left uk-padding-remove-right">
        <ChannelItem :node="child" :parent="node" :makeRoot="makeRoot" v-for="child in sortedEntries"></ChannelItem>
      </div>
    </div>

  </div>
</template>

<script>
import ChannelItem from './ChannelItem'
var _ = require('lodash');

export default {
  name: 'ChannelTree',
  props: {
    node: Object,
    resetTree: Function
  },
  components: {
    ChannelItem
  },
  data() {
    return {
      level: 0,
      history: []
    }
  },
  computed: {
    sortedEntries() {
      var entries = this.node.entries
      if(!entries || entries.length==0) return false

      var totalScore = _.sumBy(entries, function(e) {
        return parseInt(e.score)
      })
      var maxScore = _.maxBy(entries, 'score').score
      _.each(entries, function(c) {
        c.parentMaxScore = maxScore
        c.parentTotalScore = totalScore
      })
      return entries = _.orderBy(entries, 'score', 'desc')
    }
  },
  methods: {
    makeRoot(item) {
      this.history.push(this.node)
      this.node = item
    },
    resetTree() {
      this.node = node
      this.history = []
    },
    restoreToItem(index) {
      if(index) {
        this.history.splice(index, -1)
      }
      this.node = this.history.pop()
    }
  }
}

if (module.hot) {
  module.hot.accept();
}
</script>
