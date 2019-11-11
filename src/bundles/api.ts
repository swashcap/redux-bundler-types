import { createSelector } from 'redux-bundler'

export const api = {
  name: 'api',
  reducer: (
    state: {
      isLoading: boolean
      error: Error | null
      data: any | null
    } = { isLoading: false, error: null, data: null },
    action: any
  ) => {
    if (action.type === 'API_SET_LOADING') {
      return {
        ...state,
        isLoading: action.payload
      }
    } else if (action.type === 'API_SET_DATA') {
      return {
        ...state,
        data: action.payload,
        error: null
      }
    } else if (action.type === 'API') {
      return {
        ...state,
        data: null,
        error: action.payoad
      }
    }

    return state
  },
  getExtraArgs(store: any) {
    return {
      headers: ['sample']
    }
  },
  doFetchData: () => async ({ dispatch }: { dispatch: Function }) => {
    dispatch({
      payload: true,
      type: 'API_SET_LOADING'
    })

    try {
      const response = await fetch('/api')

      if (!response.ok) {
        throw new Error(`${response.status}: ${response.statusText}`)
      }

      dispatch({
        payload: await response.json(),
        type: 'API_SET_DATA'
      })
    } catch (error) {
      dispatch({
        payload: error,
        type: 'API_SET_ERROR'
      })
    } finally {
      dispatch({
        payload: false,
        type: 'API_SET_LOADING'
      })
    }
  },
  doResetData: () => {},
  selectIsLoading: (state: any) => state.isLoading,
  selectData: createSelector(
    'selectCount',
    (state: any) => state.data,
    'selectTheme',
    (count: any, data: any, theme: any) => ({
      count,
      data,
      theme
    })
  ),
  persistActions: ['API_SET_DATA']
}
