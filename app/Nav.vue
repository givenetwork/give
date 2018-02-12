<template>
  <nav class="uk-navbar-container uk-background-primary uk-navbar-transparent uk-light" uk-navbar>

    <router-link class="uk-navbar-item uk-logo uk-margin-left"   to="/">Give</router-link>

    <div class="uk-navbar-right uk-margin-right">

        <ul class="uk-navbar-nav">
            <router-link tag="li" to="/"><a>About</a></router-link>
            <router-link active-class="uk-active" tag="li" to="/channels"><a>Channels</a></router-link>
            <router-link v-if="user" active-class="uk-active" tag="li" to="/dashboard"><a>Dashboard</a></router-link>
            <router-link v-if="!user" active-class="uk-active" tag="li" to="/account/login"><a><span class="uk-logo uk-icon" uk-icon="icon: user"></span></a></router-link>
        </ul>

    </div>

  </nav>
</template>

<script>
export default{
  // components: {
  // },
  props: [
    'user'
  ],
  data() {
    return {
    };
  },
  // methods: {
  // },
  // mounted() {
  // },
};
</script>
