import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Cat from './Cat'
import * as serviceWorker from './serviceWorker';
import 'bootstrap/dist/css/bootstrap.css';
import { Route, BrowserRouter as Router } from 'react-router-dom'
const routing = (
    <Router>
      <div>
        <Route exact path="/" component={App} />
        <Route path="/cat" component={Cat} />
      </div>
    </Router>
  )
  ReactDOM.render(routing, document.getElementById('root'))
serviceWorker.unregister();
