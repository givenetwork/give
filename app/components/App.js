import React from 'react';
import PropTypes from 'prop-types';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import AppBar from 'material-ui/AppBar';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import Paper from 'material-ui/Paper';

import Login from './Users/Login';
import { Channels, CreateChannel } from './Channels/Channels';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch
} from 'react-router-dom'

const muiTheme = getMuiTheme({
  appBar: {
    height: 80
  },
});

class App extends React.Component {

  constructor(props) {

    super(props)

    this.state = {
      user: [],
      error: null
    }
  }

  componentDidMount() {

  }

  render() {
    return (
      <Router>
        <MuiThemeProvider>
          <div>
            <AppBar
               title={<Link to="/"  style={{color:'#FFF', textDecoration:'none'}}>Give</Link>}
               iconElementRight={Menu}
               style={{backgroundColor: '#252931', minHeight: 50}}
             />

            <Switch>
              <Route exact path="/" component={Home}/>
              <Route path="/channels" component={Channels}/>
              <Route path="/create" component={CreateChannel}/>
              <Route path="/account" component={Login}/>
            </Switch>
          </div>
        </MuiThemeProvider>
      </Router>
    )
  }
}


App.propTypes = {
   user: PropTypes.array
   // propArray: PropTypes.array.isRequired,
   // propBool: PropTypes.bool.isRequired,
   // propFunc: PropTypes.func,
   // propNumber: PropTypes.number,
   // propString: PropTypes.string,
};
App.defaultProps = {
   user: []
}

export default App

const Menu = (
  <div style={{paddingTop:'5px'}}>
    <FlatButton label="About" containerElement={<Link to="/" />} style={{color: '#FFF'}} />
    <FlatButton label="Channels" containerElement={<Link to="/channels" />} style={{color: '#FFF'}} />
    <FlatButton label="Account" secondary={true} containerElement={<Link to="/account" />} />
    <FlatButton label="Create" secondary={true} containerElement={<Link to="/create" />} style={{backgroundColor: '#FFF'}} />
  </div>
)

const paperStyle = {
  padding: 20,
  margin: 20,
  display: 'inline-block'
};

const Home = () => (
  <div className='container'>
    <div className='col-md-6'>
      <Paper style={paperStyle} zDepth={1}>
        <h2>Home</h2>
        <p>Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus. Integer posuere erat a ante venenatis dapibus posuere velit aliquet. Sed posuere consectetur est at lobortis. Aenean lacinia bibendum nulla sed consectetur. Nullam quis risus eget urna mollis ornare vel eu leo.</p>
      </Paper>
    </div>
  </div>
)

const About = () => (
  <div>
    <h2>About</h2>
  </div>
)
