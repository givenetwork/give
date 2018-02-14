<template>
  <td v-bind:style="{ 'width': childWeight + '%' }">
    <div class="uk-flex">
      <a v-if="history"  @click="resetTree" class="uk-button uk-button-primary uk-width-auto button-tree-up"><span class="uk-icon" uk-icon="icon: chevron-left"></span></a>
      <div class="uk-card uk-card-default uk-width-expand">
          <div class="uk-padding-small">
              <div class="uk-grid-small uk-flex-middle" uk-grid>
                  <div class="uk-width-expand">
                      <h3 class="uk-card-title uk-text-left uk-margin-remove-bottom">
                        <b>{{node.name}}</b>
                      </h3>
                      <!-- <p class="uk-text-meta uk-margin-remove-top"><time datetime="2016-04-01T19:00">April 01, 2016</time></p> -->
                  </div>
                  <div class="uk-width-auto" v-if="!!childWeight">
                    <span class="uk-button uk-button-default uk-button-round">
                      {{ childWeight }}%
                    </span>
                  </div>
              </div>
          </div>
          <div class="uk-card-footer uk-padding-small" v-if="level>1">
              <a href="#" class="uk-button uk-button-default uk-button-round"><span class="uk-icon" uk-icon="icon: pencil"></span></a>
              <a href="#" class="uk-button uk-button-primary uk-button-round" v-if="node.children"><span class="uk-icon" uk-icon="icon: plus" @click="makeTop(node)"></span></a>
          </div>
      </div>
    </div>
    <table class="uk-table" v-if="level<2">
      <tbody>
        <tr>
          <ChannelItem :node="child" :parentScoreTotal="totalScore" v-for="child in node.children" :level="level+1" />
        </tr>
      </tbody>
    </table>
  </td>
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
    level: Number,
    resetTree: Function,
    history: Object
  },
  data: function () {
    return {
      open: false,
      totalScore: _.sumBy(this.node.children, 'score' )
    }
  },
  computed: {
    isFolder: function () {
      return this.node.children &&
        this.node.children.length
    },
    childWeight: function() {
      if(!this.parentScoreTotal) return false
      var width = (100 * this.node.score / this.parentScoreTotal).toFixed(0)
      return width ? width : 100
    }
  },
  methods: {
    toggle: function () {
      if (this.isFolder) {
        this.open = !this.open
      }
    },
    itemPercentage: function(score) {
      console.log(this.totalWeight)
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
