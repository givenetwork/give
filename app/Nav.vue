<template>
  <nav class="uk-navbar-container uk-background-primary uk-navbar-transparent uk-light" uk-navbar>

    <router-link class="uk-navbar-item uk-logo uk-margin-left" to="/">Give <span class="uk-label uk-margin-small-bottom version-label">v0.1-poc</span></router-link>

    <div class="uk-navbar-right uk-margin-right">

        <ul class="uk-navbar-nav">
            <router-link tag="li" to="/about"><a>About</a></router-link>
            <router-link active-class="uk-active" tag="li" to="/channels"><a>Channels</a></router-link>
            <!-- <router-link v-if="!user" active-class="uk-active" tag="li" to="/account/login"><a><span class="uk-logo uk-icon" uk-icon="icon: user"></span></a></router-link> -->
            <div class="uk-navbar-item">
              <router-link active-class="uk-active" class="uk-button uk-button-secondary" to="/channel">Create / Edit Channel</router-link>
            </div>
            <div class="uk-navbar-item uk-padding-remove-left">
              <router-link active-class="uk-active" class="uk-button uk-button-default" to="/process">Process</router-link>
            </div>
            <!-- <li v-if="user">
                <a href="#"><a>{{user.username}} <span class="uk-icon uk-margin-small-left" uk-icon="icon: chevron-down"></span></a></a>
                <div class="uk-navbar-dropdown">
                    <ul class="uk-nav uk-navbar-dropdown-nav">
                      <router-link v-if="user" active-class="uk-active" tag="li" to="/dashboard"><a><span class="uk-icon uk-margin-small-left" uk-icon="icon: cog"></span> Dashboard</a></router-link>
                      <router-link v-if="user" active-class="uk-active" tag="li" to="/account/logout"><a><span class="uk-icon uk-margin-small-left" uk-icon="icon: sign-out"></span> Logout</a></router-link>
                    </ul>
                </div>
            </li> -->
        </ul>

    </div>
  </nav>
</template>

<script>
export default{
  store: [
    'messages',
    'user'
  ],
  data: function() {
    return {
    };
  }
};
</script>
