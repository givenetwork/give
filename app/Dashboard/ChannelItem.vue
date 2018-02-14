<template>
  <div class="channel-item">
    <div class="uk-margin-bottom" v-bind:class="{'uk-card uk-card-default' : level>1 }" v-bind:style="{ width: itemWidth + '%' }">
        <div class="uk-flex">
            <div class="uk-width-expand uk-padding-small">
                <h3 class="uk-card-title uk-text-left uk-margin-remove-bottom">
                  <b>{{node.name}}</b>
                </h3>
                <!-- <p class="uk-text-meta uk-margin-remove-top"><time datetime="2016-04-01T19:00">April 01, 2016</time></p> -->
            </div>
            <div class="uk-width-auto uk-text-right uk-padding-small" v-if="level>1">
              <div class="">
                <span class="uk-hidden@m uk-margin-small-right">{{ itemWeight }}%</span>
                <a href="#" class="uk-button uk-button-default uk-button-round"><span class="uk-icon" uk-icon="icon: pencil"></span></a>
                <a href="#" class="uk-button uk-button-primary uk-button-round" v-if="node.children" @click="makeTop(node)"><span class="uk-icon" uk-icon="icon: chevron-right"></span></a>
              </div>
            </div>
            <div class="uk-visible@m uk-button uk-width-auto uk-flex uk-flex-middle channel-item--expand" v-if="!!itemWeight" v-bind:class="{ 'uk-button-primary': node.type=='channel', 'uk-button-secondary': node.type=='user'}">
                {{ itemWeight }}%
            </div>
        </div>
    </div>
    <ChannelItem :node="child" :parentScoreTotal="totalScore" :parentScoreMax="maxScore" v-for="child in sortedChildren" :level="level+1" v-if="level<2"/>
  </div>
</template>

<script>

var _ = require('lodash');

export default {
  name: 'ChannelItem',
  store: [
    'channelTree'
  ],
  props: {
    node: Object,
    parentScoreTotal: Number,
    parentScoreMax: Number,
    level: Number,
    resetTree: Function
  },
  data: function () {
    return {
      open: false
    }
  },
  computed: {
    isFolder() {
      return this.node.children &&
        this.node.children.length
    },
    itemWeight() {
      if(!this.parentScoreTotal) return false
      var width = (100 * this.node.score / this.parentScoreTotal).toFixed(0)
      return width ? width : 100
    },
    itemWidth() {
      var width = (15 + (85 * this.node.score / this.parentScoreMax)).toFixed(2)
      return width
    },
    totalScore() {
      return _.sumBy(this.node.children, 'score' )
    },
    maxScore() {
      return _.maxBy(this.node.children, 'score').score
    },
    sortedChildren() {
      return _.orderBy(this.node.children, 'score', 'desc')
    }
  },
  methods: {
    toggle: function () {
      if (this.isFolder) {
        this.open = !this.open
      }
    },
    makeTop: function(data) {
      this.channelTree.backup.push(this.channelTree.data)
      this.channelTree.data = data
    }
    // changeType: function () {
    //   if (!this.isFolder) {
    //     Vue.set(this.node, 'children', [])
    //     this.addChild()
    //     this.open = true
    //   }
    // },
    // addChild: function () {
    //   this.node.children.push({
    //     name: 'new stuff'
    //   })
    // }
  }
}
</script>
