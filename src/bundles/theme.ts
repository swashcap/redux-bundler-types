export const theme = {
  name: 'theme',
  getReducer: (initialTheme: string = 'light') => (
    state = { lastSet: Date.now(), theme: initialTheme },
    action: any
  ) => {
    if (action.type === 'THEME_SET') {
      return {
        lastSet: Date.now(),
        theme: action.payload
      }
    }

    return state
  },
  doToggleTheme: () => ({
    dispatch,
    store
  }: {
    dispatch: Function
    store: any
  }) => {
    dispatch({
      payload: store.theme === 'light' ? 'dark' : 'light',
      type: 'THEME_SET'
    })
  },
  selectTheme: (state: any) => state.theme
}
