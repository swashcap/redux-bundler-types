export const theme = {
  name: 'theme',
  getReducer: (initialTheme: string = 'light') => (
    state = { currentTheme: initialTheme, lastSet: Date.now() },
    action: any
  ) => {
    if (action.type === 'THEME_SET') {
      return {
        currentTheme: action.payload,
        lastSet: Date.now()
      }
    }

    return state
  },
  doToggleTheme: () => ({
    dispatch,
    getState
  }: {
    dispatch: Function
    getState: any
  }) => {
    dispatch({
      payload: getState().theme.currentTheme === 'light' ? 'dark' : 'light',
      type: 'THEME_SET'
    })
  },
  selectTheme: (state: any) => state.theme
}
