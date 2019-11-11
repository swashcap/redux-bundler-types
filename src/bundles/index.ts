import { composeBundles } from 'redux-bundler'

import { api } from './api'
import { counter } from './counter'
import { theme } from './theme'
import { windowSize } from './window-size'

export const getStore = composeBundles(api, counter, theme, windowSize)
