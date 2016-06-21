import React from 'react'
import ReactDOM from 'react-dom'
import createBrowserHistory from 'history/lib/createBrowserHistory'
import { useRouterHistory } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'
import createStore from './store/createStore'
import AppContainer from './containers/AppContainer'

/**
 * Browser History Setup
 * =====================
 */
const browserHistory = useRouterHistory(createBrowserHistory)({
  basename: null,
})


/**
 * Store and History Instantiation
 * ===============================
 */

const initialState = window.__INITIAL_STATE__
const store = createStore(initialState, browserHistory)
const history = syncHistoryWithStore(browserHistory, store, {
  setLocationState: (state) => state.router,
})


/**
 * Render Setup
 * ============
 */

const MOUNT_NODE = document.getElementById('app')

let render = (routerKey = null) => {
  const routes = require('./routes/index').default(store)

  ReactDOM.render(
    <AppContainer
      store={store}
      history={history}
      routes={routes}
      routerKey={routerKey}
    />,
    MOUNT_NODE
  )
}

render()
