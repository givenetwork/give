<template>
  <nav class="uk-navbar-container uk-background-primary uk-navbar-transparent uk-light" uk-navbar>

    <router-link class="uk-navbar-item uk-logo uk-margin-left" to="/">Give</router-link>

    <div class="uk-navbar-right uk-margin-right">

        <ul class="uk-navbar-nav">
            <router-link tag="li" to="/"><a>About</a></router-link>
            <router-link active-class="uk-active" tag="li" to="/channels"><a>Channels</a></router-link>
            <router-link v-if="!user" active-class="uk-active" tag="li" to="/account/login"><a><span class="uk-logo uk-icon" uk-icon="icon: user"></span></a></router-link>
            <div class="uk-navbar-item">
              <router-link v-if="user" active-class="uk-active" class="uk-button uk-button-secondary" to="/channels/new">Create Channel</router-link>
            </div>
            <li v-if="user">
                <a href="#"><a>{{user.username}} <span class="uk-icon uk-margin-small-left" uk-icon="icon: chevron-down"></span></a></a>
                <div class="uk-navbar-dropdown">
                    <ul class="uk-nav uk-navbar-dropdown-nav">
                      <router-link v-if="user" active-class="uk-active" tag="li" to="/account/logout"><a>Logout <span class="uk-icon uk-margin-small-left" uk-icon="icon: logout"></span></a></router-link>
                    </ul>
                </div>
            </li>
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
