<template>
  <div class="uk-grid-medium uk-child-width-1-2@s uk-child-width-1-4@m uk-text-center" uk-grid>
    <div v-for="channel in channels">
      <div class="uk-card uk-card-default">
        <div class="uk-card-body">
          {{channel.title}}
        </div>
        <div class="uk-card-footer">
          <router-link :to="{ path: 'channels/' + channel.id }" class="uk-button uk-button-text uk-width-1-1">View Channel</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ChannelList',
  props: {
    channels: Array,
  },
  data: function () {
    return {
    }
  }
}
</script>
