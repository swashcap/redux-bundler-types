import { HAS_WINDOW } from 'redux-bundler'

/**
 * Track the `window`'s dimensions.
 */
export const windowSize = {
  name: 'windowSize',
  reducer: (state: { height: null; width: null }, action: any) => {
    if (action.type === 'WINDOW_SIZE_SET') {
      return action.payload
    }

    return state
  },
  init: (store: any) => {
    const setWindowSize = () =>
      store.dispatch({
        payload: HAS_WINDOW && {
          height: window.innerHeight,
          width: window.innerWidth
        },
        type: 'WINDOW_SIZE_SET'
      })

    setWindowSize()

    window.addEventListener('resize', setWindowSize)

    return () => window.removeEventListener('resize', setWindowSize)
  },
  selectHeight: (state: any) => state.height,
  selectWidth: (state: any) => state.width
}
