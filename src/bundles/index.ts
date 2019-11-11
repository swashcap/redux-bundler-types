import { composeBundles } from 'redux-bundler'

import { counter } from './counter'
import { theme } from './theme'

export const getStore = () => composeBundles(counter, theme)
