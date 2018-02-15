<template>
  <div class="channel-tree">

    <div class="uk-margin-left">
      <ul class="uk-breadcrumb">
          <li v-for="(item, key) in history" v-if="history.length">
            <a @click="restoreToItem(key)">{{ item.name }}</a>
          </li>
          <li><span>{{ currentNode.name }}</span></li>
      </ul>
    </div>

    <div class="channel-tree--view">
      <div class="uk-card uk-card-default">
        <h3 class="uk-text-left uk-margin-remove-bottom">
          <a v-if="history.length>0"  @click="restoreToItem" class="uk-button uk-button-secondary button-tree-up"><span class="uk-icon" uk-icon="icon: chevron-left"></span></a>
          <a v-else class="uk-button uk-button-secondary button-tree-up"><span class="uk-icon" uk-icon="icon: hashtag"></span></a>
          <b class="uk-margin-left">{{currentNode.name}}</b>
        </h3>
      </div>

      <div class="uk-background-muted uk-padding uk-padding-remove-left uk-padding-remove-right">
        <ChannelItem :node="child" :parent="currentNode" :makeRoot="makeRoot" v-for="child in sortedChildren"></ChannelItem>
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
      history: [],
      currentNode: {}
    }
  },
  beforeMount() {
    this.currentNode = this.node
  },
  computed: {
    sortedChildren() {
      var children = this.currentNode.children
      var totalScore = _.sumBy(children, 'score' )
      var maxScore = _.maxBy(children, 'score').score
      _.map(children, function(c) {
        c.parentMaxScore = maxScore
        c.parentTotalScore = totalScore
      })
      return children = _.orderBy(children, 'score', 'desc')
    }
  },
  methods: {
    makeRoot(item) {
      console.log(item)
      this.history.push(this.currentNode)
      this.currentNode = item
    },
    resetTree() {
      this.currentNode = node
      this.history = []
    },
    restoreToItem(index) {
      if(index) {
        this.history.splice(index, -1)
      }
      this.currentNode = this.history.pop()
    }
  }
}

if (module.hot) {
  module.hot.accept();
}
</script>
