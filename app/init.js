import 'babel-polyfill';
import ReactDOM from 'react-dom';
import React from 'react';
import App from './components/App';

export default() => {
  document.addEventListener('DOMContentLoaded', () => {
    ReactDOM.render(<App />, document.querySelector('#app'));
  });

  const App_LoggingAccount_Secret = 'SANEBE6ZH76OVZYQXOUOEPW64EA4UDMUHYBZ3GQHWLYJYID2F2EZ7PGH';
}
