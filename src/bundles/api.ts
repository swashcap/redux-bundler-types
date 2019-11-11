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
    } else if (action.type === 'API_SET_ERROR') {
      return {
        ...state,
        data: null,
        error: action.payload
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
      const response = await fetch('http://localhost:3000/posts')

      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`)
      } else if (response.status >= 300) {
        throw new Error(`Redirect: ${response.status} ${response.statusText}`)
      }

      const payload = await response.json()

      dispatch({
        payload,
        type: 'API_SET_DATA'
      })
    } catch (error) {
      if (process.env.NODE_ENV === 'development') {
        console.error(error)
      }

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
  selectIsLoading: (state: any) => state.api.isLoading,
  selectError: (state: any) => state.api.error,
  selectData: createSelector(
    'selectCount',
    (state: any) => state.api.data,
    'selectTheme',
    (count: any, data: any, theme: any) =>
      data
        ? {
            count,
            data,
            theme
          }
        : null
  ),
  persistActions: ['API_SET_DATA']
}
