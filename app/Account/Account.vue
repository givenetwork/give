<template>
<div class="uk-padding">

  <form class="uk-form-width-large uk-align-center" @submit.prevent>

      <h2>{{ $route.meta.title }}</h2>

      <div uk-alert>

        <div class="uk-margin">
            <div class="uk-inline uk-width-1-1">
                <span class="uk-form-icon" uk-icon="icon: user"></span>
                <input class="uk-input" v-model="username" type="text" placeholder="Username">
            </div>
        </div>

        <div class="uk-margin">
            <div class="uk-inline uk-width-1-1">
                <span class="uk-form-icon" uk-icon="icon: lock"></span>
                <input class="uk-input" v-model="password" type="password" placeholder="Password" autocomplete="">
            </div>
        </div>

        <div v-if="$route.path=='/account/signup'">

        </div>

        <button class="uk-button uk-button-primary uk-width-1-1" @click="submit">{{ $route.meta.title }}</button>

      </div>

      <div v-if="$route.path=='/account/login'" class="uk-text-center">
        <p>No account yet?</p>

        <router-link to="/account/signup" tag="button" class="uk-button uk-button-default uk-width-1-1 uk-button-large">Create New Account</router-link>
      </div>

      <div v-if="$route.path=='/account/signup'" class="uk-text-center">
        Already have an account? <router-link to="/account/login">Login</router-link>

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

      </div>

  </form>
</div>
</template>

<script>
import Util from '../Util'
import StellarHDWallet from 'stellar-hd-wallet'

const user = Util.user

export default {
  store: [
    'user',
    'messages'
  ],
  data: function() {
    return {
      username: '',
      password: '',
      email: '',
      passphrase: '',
      publicKey: ''
    }
  },
  methods: {
    login(username, password) {
      username = username || this.username
      password = password || this.password
      user.auth(username, password, this.onLoginSuccess)
    },
    onLoginSuccess(ack) {
      if(!ack.err) {

        // Store User Data

        this.user = {
          username: ack.alias,
          id: ack.id
        }
        this.messages.setMessage("Login successful", "success", "LOGIN")
        this.$router.push("/dashboard")
      }
      else {
        this.messages.setMessage("Login error", "danger", "LOGIN")
      }
    },
    signup(username, password) {
      user.create(username, password, this.onSignupSuccess)
    },
    onSignupSuccess(ack) {

        if(!!!ack.err) {

          const mnemonic = StellarHDWallet.generateMnemonic()
          const wallet = StellarHDWallet.fromMnemonic(mnemonic)

          console.log("Writing user stellar node")
          var result = user.get('stellar').put({
            publicKey: wallet.getPublicKey(0),
            secret: wallet.getSecret(0) //TODO: gun.SEA.enc(...) this
          })

          console.log("Writing user profile node")
          var userProfile = Util.gun.get('user/' + this.username).put({
            stellarAddress: wallet.getPublicKey(0)
          })
          user.get('profile').put(userProfile)

          this.passphrase = mnemonic
          this.publicKey = wallet.getPublicKey(0)

          UIkit.modal("#newaccount").show()

          this.messages.setMessage("User succesfully registered!", "success", "SIGNUP")

          this.login(this.username, this.password)
        }
        else {
          this.messages.setMessage(ack.err, "danger", "LOGIN")
        }
    },
    submit() {

      this.messages.clearAll()

      var error = "";
      if(!this.username) {
        error += "Username is required. ";
      }

      if(!this.password) {
        error += "Password is required. ";
      }

      if(error) {
        this.messages.setMessage(error)
        return false
      }

      var action = this.$route.path=='/account/signup' ? 'signup' : 'login';

      if(action=='login') {
        this.login(this.username, this.password )
      }
      else {
        this.signup(this.username, this.password)
      }
    }
  }
}
</script>
