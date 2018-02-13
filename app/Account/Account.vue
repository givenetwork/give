<template>
<div class="uk-margin-large">

  <form class="uk-form-width-large uk-form-stacked uk-align-center" @submit.prevent>

      <h2>{{ $route.meta.title }}</h2>

      <div uk-alert>

        <div class="uk-margin">
            <div class="uk-inline uk-width-1-1">
                <span class="uk-form-icon" uk-icon="icon: lock"></span>
                <input class="uk-input" v-model="passphrase_login" type="text" placeholder="Your passphrase">
            </div>
        </div>

        <button class="uk-button uk-button-primary uk-width-1-1" @click="login">Submit</button>

      </div>

      <div class="uk-text-center">
        <p>No account yet?</p>

        <button class="uk-button uk-button-default uk-width-1-1 uk-button-large" @click="newAccount">Create New Account</button>

      </div>

      <div id="newaccount" uk-modal>
          <div class="uk-modal-dialog">
              <div class="uk-modal-body">
                <h2 class="uk-modal-title">Success!</h2>
                <p>Your new account has been created!</p>
                <div class="uk-margin">
                  <label class="uk-form-label uk-text-uppercase">Your Passphrase</label>
                  <textarea class="uk-textarea uk-margin-small-bottom uk-width-1-1 uk-padding-small" v-model="passphrase" placeholder="Your passphrase" rows="3"></textarea>
                  <button class="uk-button uk-button-default uk-width-1-1" type="button">Copy to Clipboard</button>
                </div>
                <div class="uk-margin">
                  <label class="uk-form-label uk-text-uppercase">Your Give Stellar Address</label>
                  <div class="uk-inline uk-width-1-1">
                      <span class="uk-form-icon" uk-icon="icon: bolt"></span>
                      <input class="uk-input" v-model="publicKey" type="text">
                  </div>
                </div>
                <p>Make sure to copy and securely store your passphrase before closing this window!</p>
                <button class="uk-button uk-button-primary uk-width-1-1 uk-modal-close" type="button">I've done it! Close the window</button>
              </div>
          </div>
      </div>

  </form>

</div>
</template>

<script>
import StellarHDWallet from 'stellar-hd-wallet'
import StellarSdk from 'stellar-sdk'
import Datastore from '../Datastore'
import { mapGetters, mapActions } from 'vuex'

export default {
  data: function() {
    return {
      passphrase: '',
      passphrase_login: '',
      publicKey: ''
    }
  },
  methods: {
    login: function() {
      Datastore.dispatch('login', { username: this.username, password: this.password })
    },
    newAccount: function() {
      const mnemonic = StellarHDWallet.generateMnemonic()
      const wallet = StellarHDWallet.fromMnemonic(mnemonic)

      this.passphrase = mnemonic;
      this.publicKey = wallet.getPublicKey(0);

      UIkit.modal('#newaccount').show();
    }
  }
}

if (module.hot) {
  module.hot.accept();
}
</script>
