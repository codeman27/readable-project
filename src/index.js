import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './components/App'
import reducer from './reducers'
import registerServiceWorker from './registerServiceWorker'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import {createStore, applyMiddleware, compose} from 'redux'
import promiseMiddleware from 'redux-promise-middleware'
import logger from 'redux-logger'
import thunk from 'redux-thunk'

const middleware = applyMiddleware(promiseMiddleware(), thunk, logger)
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const store = createStore(reducer,
  reducer,
  composeEnhancers(
    middleware
  )
)

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>, document.getElementById('root'));
registerServiceWorker();
