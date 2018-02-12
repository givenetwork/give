<template>
  <nav class="uk-navbar-container uk-background-primary uk-navbar-transparent uk-light" uk-navbar>

    <router-link class="uk-navbar-item uk-logo"   to="/">Give</router-link>

    <div class="uk-navbar-right">

        <ul class="uk-navbar-nav">
            <router-link active-class="uk-active" tag="li" to="/"><a>About</a></router-link>
            <router-link active-class="uk-active" tag="li" to="/channels"><a>Channels</a></router-link>
            <router-link active-class="uk-active" tag="li" to="/dashboard"><a>Dashboard</a></router-link>
            <router-link active-class="uk-active" tag="li" to="/account/login"><a>Login</a></router-link>
            <router-link active-class="uk-active" tag="li" to="/account/signup"><a>Sign up</a></router-link>
        </ul>

    </div>

  </nav>
</template>

<script>
export default{
  // components: {
  // },
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
