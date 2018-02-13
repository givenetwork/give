<template>
  <div>
    <Nav></Nav>

    <div v-if="messages.list">
      <div v-bind:class="['uk-padding-small', 'uk-alert-' + message.class]" v-for="(message, index) in messages.list" uk-alert>
        <a class="uk-alert-close" uk-close @click="messages.clearMessage(index)"></a>
        {{message.message}}
      </div>
    </div>

    <router-view></router-view>
  </div>
</template>

<script>

import Nav from './Nav.vue'

export default {
  store: [
    'user',
    'messages'
  ],
  data: function() {
    return {
    }
  },
	components: {
		Nav
	}

}

if (module.hot) {
  module.hot.accept();
}
</script>
