declare module 'redux-bundler-preact' {
  import {
    Component as PreactComponent,
    ComponentChildren,
    Context,
    FunctionComponent,
    Provider as PreactProvider,
    ComponentType
  } from 'preact'
  import { Store } from 'redux-bundler'

  /**
   * Helper type for unwrapping `string[]`
   * {@link https://github.com/microsoft/TypeScript/issues/20965#issuecomment-354858633}
   */
  type ValuesOf<T extends any[]> = T[number]

  /**
   * A Preact `Context` for a redux store.
   * {@link https://preactjs.com/guide/v10/context}
   */
  export const StoreContext: Context<Store<any> | undefined>

  /**
   * Preact bindings for redux.
   *
   * ```
   * <Provider store={myStore}>
   *   <MyApp />
   * </Provider>
   * ```
   */
  export const Provider: FunctionComponent<{
    children: ComponentChildren
    store: Store<any>
  }>

  /**
   * All `connect`-ed components are passed a `store` through props.
   */
  export interface ConnectedStore<S> {
    store: Store<S>
  }

  export abstract class ConnectedComponent<
    P,
    S,
    A extends Record<string, (...args: any[]) => any>
  > extends PreactComponent<
    P & ConnectedStore<S>,
    ReturnType<Store<S>['select']>
  > {
    actionCreators: A
    unsubscribe: ReturnType<Store<S>['subscribeToSelectors']>
  }

  /**
   * Preact bindings for redux.
   *
   * This function provides the application's `Store` to a component on the
   * `store` property:
   *
   * ```
   * const MyConnectedComponent = connect(
   *   ({ store, ...rest }) => (
   *     <div {...rest}>
   *       <p>{store.bundle.property}</p>
   *     </div>
   *   )
   * )
   * ```
   */
  export function connect<Props, Store>(
    Component: ComponentType<Props & ConnectedStore<Store>>
  ): FunctionComponent<Props>

  /**
   * Preact bindings for redux.
   *
   * This function maps redux-bundler action creators and selectors to as
   * strings to properties that can be used in a component. It also passes the
   * application's `Store` via the `store` property:
   *
   * ```
   * const MyConnectedCounter = connect(
   *   'doIncrementCount',
   *   'selectCount',
   *   ({ count, doIncrementCount, store, ...rest }) => (
   *     <div {...rest}>
   *       <p>Current count: <strong>{count}</strong></p>
   *       <button
   *         onClick={doIncrementCount}
   *         type="button"
   *       >
   *         Increment
   *       </button>
   *     </div>
   *   )
   * )
   * ```
   */
  export function connect<Props, Store, ConnectedProps>(
    ...selectors: Array<
      string | ComponentType<Props & ConnectedStore<Store> & ConnectedProps>
    >
  ): FunctionComponent<Props>
}
