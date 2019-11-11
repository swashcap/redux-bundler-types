export const counter = {
  name: 'counter',
  reducer: (state = 0, action: any) => {
    switch (action.type) {
      case 'COUNTER_DECREMENT':
        return state - action.payload
      case 'COUNTER_INCREMENT':
        return state + action.payload
      default:
        return state
    }
  },
  doDecrementCount: (value: number) => ({
    dispatch,
    store
  }: {
    dispatch: Function
    store: any
  }) => {
    if (store - value > 0) {
      dispatch({
        payload: value,
        type: 'COUNTER_DECREMENT'
      })
    }
  },
  doIncrementCount: (value: number) => ({ dispatch }: { dispatch: Function }) =>
    dispatch({
      payload: value,
      type: 'COUNTER_INCREMENT'
    }),
  selectCount: (state: any) => state
}
