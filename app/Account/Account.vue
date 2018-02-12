<template>
<div>
  <div class="uk-margin-medium-top">
    <ul class="uk-flex-center" uk-tab>
      <router-link active-class="uk-active" tag="li" to="/account/login" append><a>Login</a></router-link>
      <router-link active-class="uk-active" tag="li" to="/account/signup" append><a>Sign up</a></router-link>
    </ul>
  </div>

  <form class="uk-form-width-large uk-align-center">

      <h2>{{ $route.meta.title }}</h2>

      <div class="uk-margin">
            <div class="uk-inline uk-width-1-1">
              <span class="uk-form-icon" uk-icon="icon: user"></span>
              <input class="uk-input" type="text" placeholder="Username">
          </div>
      </div>

      <div class="uk-margin">
          <div class="uk-inline uk-width-1-1">
              <span class="uk-form-icon" uk-icon="icon: lock"></span>
              <input class="uk-input" type="password" placeholder="Password">
          </div>
      </div>

      <div v-if="$route.path =='/account/signup'">
        <div class="uk-margin">
            <div class="uk-inline uk-width-1-1">
                <span class="uk-form-icon" uk-icon="icon: bolt"></span>
                <input class="uk-input" type="text" placeholder="Stellar Wallet">
            </div>
        </div>

        <div class="uk-margin">
            <div class="uk-inline uk-width-1-1">
                <span class="uk-form-icon" uk-icon="icon: mail"></span>
                <input class="uk-input" type="email" placeholder="E-mail">
            </div>
        </div>
      </div>

      <button class="uk-button uk-button-primary uk-width-1-1">Submit</button>


  </form>

</div>
</template>

<script>
export default {
  data() {
    return {
      index: 0,
      active: 0,
      items: {
        'item-0': {
          name: 'Item'
        },
        'item-1': {
          name: 'Item'
        },
        'item-2': {
          name: 'Item',
          disabled: true
        }
      }
    }
  }
}
</script>
