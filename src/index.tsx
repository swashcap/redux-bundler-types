import { h, render } from 'preact'
import { Provider } from 'redux-bundler-preact'

import { App } from './components/App'
import { getStore } from './bundles/index'

const store = getStore()

const mount = () => {
  const appEl = document.getElementById('app')

  if (appEl) {
    render(
      <Provider store={store}>
        <App />
      </Provider>,
      appEl
    )
  }
}

mount()
