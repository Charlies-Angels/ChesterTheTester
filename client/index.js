import React from 'react'
import ReactDOM from 'react-dom'
import {Provider} from 'react-redux'
import {Router} from 'react-router-dom'
import history from './history'
import store from './store'
import App from './app'
import { PersistGate } from 'redux-persist/integration/react'

// establishes socket connection
import './socket'

const persistor = store().persistor
const reduxStore = store().store

ReactDOM.render(
  <Provider store={reduxStore}>
  <PersistGate loading={null} persistor={persistor}>
    <Router history={history}>
      <App />
    </Router>
  </PersistGate>
  </Provider>,
  document.getElementById('app')
)
