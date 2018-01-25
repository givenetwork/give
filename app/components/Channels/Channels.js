import React from 'react';
import Paper from 'material-ui/Paper';

// import {CopyToClipboard} from 'react-copy-to-clipboard';
import {Link} from 'react-router-dom';

const paperStyle = {
  padding: 20,
  margin: 20,
  display: 'inline-block'
};


export class Channels extends React.Component {

  constructor(props) {

    super(props)

    this.state = {
      channels: {}
    }

  }

  componentWillMount() {
    // var data = JSON.parse(atob(this.props.match.params.id));
    // this.setState({ 'data': data })
  }

  channelId() {
    // var data = JSON.parse(atob(this.props.match.params.id));
  }

  render() {
    return (
      <div className='container'>
        <div className='col-md-6'>
          <Paper style={paperStyle} zDepth={1}>
            <h2>Channels</h2>
            <p>Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus. Integer posuere erat a ante venenatis dapibus posuere velit aliquet. Sed posuere consectetur est at lobortis. Aenean lacinia bibendum nulla sed consectetur. Nullam quis risus eget urna mollis ornare vel eu leo.</p>
          </Paper>
        </div>
      </div>
    )
  }

}

export class CreateChannel extends React.Component {
  render() {
    return(
      <div className='container'>
        <div className='col-md-6'>
          <Paper style={paperStyle} zDepth={1}>
            <h2>Create a Channel</h2>
          </Paper>
        </div>
      </div>
    )
  }
}
