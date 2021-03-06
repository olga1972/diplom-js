import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App/App';
import {Provider} from 'react-redux';
import {BrowserRouter as Router} from 'react-router-dom';

import store from './store';

import './fonts.scss';

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>,
  document.getElementById('root')
);


