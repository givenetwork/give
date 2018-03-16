<template>
  <div>
    <div class="channel-item uk-flex uk-flex-wrap-stretch uk-margin-small-bottom uk-background-muted">
      <div class="uk-flex-auto">
        <div class="uk-card uk-card-default channel-item--card" v-bind:style="{ width: itemWidth + '%' }">
          <div class="uk-flex">
            <div class="uk-width-expand uk-padding-small">
                <div v-if="!edit">
                  <h3 class="uk-card-title uk-text-left uk-margin-remove-bottom uk-display-inline" >
                    <a class="uk-button uk-button-default uk-button-round" v-if="parent.canEdit" @click="toggleEditItem"><span class="uk-icon" uk-icon="icon: pencil"></span></a>
                    <a class="uk-button uk-button-round" v-else><span class="uk-icon" uk-icon="icon: lock"></span></a>
                    <b>{{node.name}}</b>
                    <small v-if="node.id">{{node.id}}</small>
                  </h3>
                </div>
                <div v-else>
                  <h3 class="uk-card-title uk-text-left uk-margin-remove-bottom uk-display-inline" >
                    <form @submit="saveItem" class="uk-display-inline" @submit.prevent>
                      <button class="uk-button uk-button-primary uk-button-round" @click="saveItem"><span class="uk-icon" uk-icon="icon: check"></span></button>
                      <input class="uk-input uk-width-1-6" type="text" v-model="tempScore">
                    </form>
                    <span>{{ node.name }}</span>
                    <small v-if="node.id">{{node.id}}</small>
                  </h3>
                </div>
                <!-- <p class="uk-text-meta uk-margin-remove-top"><time datetime="2016-04-01T19:00">April 01, 2016</time></p> -->
            </div>
            <div class="uk-width-auto uk-text-right uk-padding-small">
              <div class="">
                <span class="uk-hidden@m uk-margin-small-right">{{ itemWeight }}%</span>
              </div>
            </div>
            <div class="uk-visible@m uk-button uk-width-auto uk-flex uk-flex-middle channel-item--expand" v-if="!!itemWeight" v-bind:class="{ 'uk-button-primary': node.type=='channel', 'uk-button-secondary': node.type=='user'}">
                ({{ itemWeight }}%)
            </div>
          </div>
        </div>
      </div>
      <div class="uk-flex-none uk-padding-small channel-item--tools">
        <a class="uk-button uk-button-default uk-button-round" v-if="node.children" @click="makeRootCall"><span class="uk-icon" uk-icon="icon: chevron-right"></span></a>
      </div>
    </div>
  </div>
</template>

<script>

var _ = require('lodash');

export default {
  name: 'ChannelItem',
  props: {
    parent: Object,
    node: Object,
    makeRoot: Function,
  },
  data: function () {
    return {
      edit: false,
      tempScore: this.node.score
    }
  },
  computed: {
    isFolder() {
      return this.node.children &&
        this.node.children.length
    },
    itemWeight() {
      if(!this.node.parentTotalScore) return false
      var width = (100 * this.node.score / this.node.parentTotalScore).toFixed(0)
      return width ? width : 100
    },
    itemWidth() {
      var width = (20 + (80 * this.node.score / this.node.parentMaxScore)).toFixed(2)
      return width
    }
  },
  methods: {
    toggleEditItem() {
      this.edit = !this.edit
    },
    saveItem() {
      this.node.score = this.tempScore
      this.edit = false

      var itemIndex = _.find(this.parent.entries, { id: this.node.id })
      this.parent.entries[itemIndex].score = this.tempScore
      console.log(itemIndex, this.parent.entries, this.tempScore)

    },
    makeRootCall() {
      this.makeRoot(this.node)
    }
  }
}
</script>
