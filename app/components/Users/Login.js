import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import Toggle from 'material-ui/Toggle';
import {Tabs, Tab} from 'material-ui/Tabs';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'
import Database from '../Database';
import StellarSdk from 'stellar-sdk';

const database = new Database()
      , ipfs = database.ipfs

// Stellar
const stellarServer = new StellarSdk.Server('https://horizon-testnet.stellar.org')
      , shajs = require('sha.js')
      , salt = 'letsgivemore'
      , pbkdf2 = require('pbkdf2');

class Login extends React.Component {

  constructor(props){

    super(props);
    this.state = {
      register: 0,
      username:'',
      password:'',
      email:'',
      stellarAddress: '',
      errors: {}
    }
  }

  componentWillMount() {
    console.log(this.state, "BADA");
  }

  toggleRegister(value) {
    console.log(value);
    this.setState({ register: value });
  }
  handleResponse(response) {
    return response.ok
      ? response.json().then((data) => JSON.stringify(data, null, 2))
      : Promise.reject(new Error('Unexpected response'));
  }

  showMessage(message) {
    console.log(message)
  }

  handleSubmit(event) {

    event.preventDefault();

    var action = 'login';
    if(this.state.register==1) {
      action = 'register';
    }

    switch(action) {
      // Login
      case 'login':
        break;

      // Create new Account
      case 'register':

        // 1 - Generate long secret

        var secret = pbkdf2.pbkdf2Sync(this.state.username + ":" + this.state.password + ":", salt, 1, 32, 'sha256')

        // Generate Stellar keypair
        var keys = StellarSdk.Keypair.fromRawEd25519Seed(secret);

        // 2 - TODO: Give the account some funds

        // var http = new XMLHttpRequest()
        // http.open("GET", "https://ipfs.io/ipfs/" + file.hash)
        // http.addEventListener("load", function() {
        //
        //   console.log(this.responseText)
        //
        // })
        // try {
        //   http.send();
        // } catch(exception) {
        //   // this is expected
        // }

        // request.get({
        //   url: 'https://horizon-testnet.stellar.org/friendbot',
        //   qs: { addr: keys.publicKey() },
        //   json: true
        // }, function(error, response, body) {
        //   if (error || response.statusCode !== 200) {
        //     console.error('ERROR!', error || body);
        //   }
        //   else {
        //     console.log('SUCCESS! New account funded. \n', body);
        //   }
        // });

        // 3 - Write user data

        ipfs.id(function (err, identity) {
          if (err) {
            throw err
          }
          console.log("ipfs ready", identity)
        });

        ipfs.swarm.addrs(function (err, addrs) {
          if (err) {
            throw err
          }
          console.log("Peers", addrs)
        })

        // 3.1 - User JSON

        var userdata = JSON.stringify({
          username: this.state.username,
          email: this.state.email,
          stellarAccount: keys.publicKey(),
          wallet: this.state.stellarAddress,
          created: new Date()
        });

        var channeldata = JSON.stringify({
          "default" : {
            "id" : this.state.username + '_default',
            "title" : this.state.username + " Default Portfolio",
            "vectors" : {
              "@" : 1
            }
          }
        });

        var userfile = new File([userdata], "/user.json");
        var channelfile = new File([channeldata], "/channels.json");

        // 3.2 - Write JSON to IPFS

        var files = [
          {
            path: userfile.path,
            content: Buffer.from(userdata)
          },
          {
            path: channelfile.path,
            content: Buffer.from(channeldata)
          }
          // TODO: Folder object needed here?
        ]

        ipfs.files.add(files, (err, filesAdded) => {
          if (err) {
            return console.error('Error - ipfs files add', err, res)
          }
          filesAdded.forEach((file) => {
            console.log('successfully stored', file.name, file.hash)
            console.log("Now pinging file to share with network...")

            var http = new XMLHttpRequest()
            http.open("GET", "https://ipfs.io/ipfs/" + file.hash)
            http.addEventListener("load", function() {

              console.log(this.responseText)

            })
            try {
              http.send();
            } catch(exception) {
              // this is expected
            }
          })

        })

        break;
    }

  }


  checkUsername() {
    // TODO
  }

  //
  // Stellar address verification
  //
  // GDXS57IS3JLYHRZT7NCQDEZABZGCBQN6J2JGUHEDFUEQDSIWDPXUAKB5
  //
  handleStellarAddressBlur() {
    if(this.state.stellarAddress) {
      this.setState({ errors: {
        stellarAccountError: false
      }});
      var parent = this;
      stellarServer.loadAccount(this.state.stellarAddress).then(function(account) {
        console.log("Account exists");
      }).catch(function (err) {
        parent.setState({ errors: {
          stellarAccountError: 'Stellar Account does not exist'
        }});
      });
    }
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit.bind(this)}>
        <Tabs
          value={this.state.register}
          onChange={(value) => this.toggleRegister(value)}
          >
          <Tab label="Login" value={0}>
            <CardTitle className='loginTitle' title="Login" />
          </Tab>
          <Tab label="Register" value={1} >
            <CardTitle className='loginTitle' title="Register" />
          </Tab>
        </Tabs>
        <div className='loginForm'>
          <TextField
            hintText="Enter your Username"
            floatingLabelText="Username"
            onChange = {(event,newValue) => this.setState({username:newValue})}
            onBlur = {() => this.checkUsername()}
            />
          <br/>
            <TextField
              type="password"
              hintText="Enter your Password"
              floatingLabelText="Password"
              onChange = {(event,newValue) => this.setState({password:newValue})}
              />
          <br/>
          {this.state.register == 1 && (
            <div>
              <TextField
                hintText="Wallet Public Address"
                floatingLabelText="Wallet Address"
                onChange = {(event,newValue) => this.setState({stellarAddress:newValue})}
                onBlur = {() => this.handleStellarAddressBlur()}
                errorText={this.state.errors.stellarAccountError}
                />
              <br/>
              <TextField
                hintText="Enter your Email"
                floatingLabelText="Email"
                onChange = {(event,newValue) => this.setState({email:newValue})}
                />
              <br/>
            </div>
          )}
          <RaisedButton type="submit" label="Submit" primary={true} style={style} disabled={!!this.state.errors.stellarAccountError} />
        </div>
      </form>
    );
  }
}
const style = {
 margin: 15,
};
export default Login;






// const messages = document.querySelector('#messages');
// const logout = document.querySelector('#logout');
// const login = document.querySelector('#login');
// const play = document.querySelector('.play');
//
// const showMessage = (message) => {
//   console.info(message);
//   messages.textContent += `\n${message}`;
//   messages.scrollTop = messages.scrollHeight;
// };
//
// const handleResponse = (response) => {
//   return response.ok
//     ? response.json().then((data) => JSON.stringify(data, null, 2))
//     : Promise.reject(new Error('Unexpected response'));
// };
//
// login.onclick = () => {
//
// };
//
// logout.onclick = () => {
//   fetch('/logout', { method: 'DELETE', credentials: 'same-origin' })
//     .then(handleResponse)
//     .then(showMessage)
//     .catch((err) => showMessage(err.message));
// };
