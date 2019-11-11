/**
 * Types for redux-bundler.
 *
 * {@link https://reduxbundler.com/api/top-level.html}
 */
declare module 'redux-bundler' {
  // TODO: Re-export all of redux's exports
  import {
    Action,
    AnyAction,
    Dispatch,
    Reducer,
    Store as ReduxStore,
    Unsubscribe
  } from 'redux'

  type AnyThunk = () => any
  type AnyFn = (...args: any[]) => any

  /**
   * redux-bundler enhances redux's `Store`
   * {@link https://reduxbundler.com/api/store.html}
   */
  export type Store<S, A extends Action = AnyAction> = ReduxStore<S, A> & {
    /**
     * Dispatch an action creator by name.
     */
    action: (name: string, args: any[]) => any
    /**
     * Destroy the `Store` instance by cleaning up state and unsubscribing to
     * listeners.
     */
    destroy: () => void
    /**
     * Dynamically add a `Bundle`.
     */
    integrateBundles: (...bundles: Bundle<S, any>[]) => any
    select: (...selectors: string[]) => any
    selectAll: () => any
    subscribeToSelectors: (
      selectors: string[],
      onChange: Function
    ) => Unsubscribe
    subscribeToAllChanges: (onChange: Function) => Unsubscribe
  }

  // TODO: add extraArgs...
  export interface BundleActionCreatorOptions<S, A extends Action> {
    dispatch: Dispatch<A>
    getStore: () => Store<S, A>
    store: Store<S, A>
  }

  export type BundleActionCreator<S, A extends Action> = (
    options: BundleActionCreatorOptions<S, A>
  ) => any

  export type BundleSelector<S, A extends Action> = Record<
    string,
    (state: S) => any
  >

  export type BundleReactor<S, A extends Action> = Record<
    string,
    () =>
      | Parameters<Dispatch<A>>[0]
      | {
          actionCreator: string
          args: string[]
        }
  >

  export type Bundle<
    State,
    Name extends string,
    A extends Action = AnyAction
  > = Record<
    string,
    | BundleActionCreator<State, A>
    | BundleSelector<State, A>
    | BundleReactor<State, A>
    | any
  > & {
    /**
     * The bundle's name.
     * {@link https://reduxbundler.com/api/bundle.html#bundlename}
     */
    name: Name

    /**
     * {@link https://reduxbundler.com/api/bundle.html#bundlereducer-or-bundlegetreducer}
     */
    reducer?: Reducer<any>
    getReducer?: () => Reducer<any>

    /**
     * {@link https://reduxbundler.com/api/bundle.html#bundlegetextraargs}
     */
    getExtraArgs?: (store: Store<State>) => any

    /**
     * {@link https://reduxbundler.com/api/bundle.html#bundlepersistactions}
     */
    init?: (store: Store<State>) => AnyThunk | any

    /**
     * An array of action `type`s that should lazily persist the bundle's state
     * to a cache.
     *
     * {@link https://reduxbundler.com/api/bundle.html#bundlepersistactions}
     */
    persistActions?: string[]
  }

  /**
   * Compose application `Bundle`s **with** redux-bundler's built-in middleware.
   */
  export function composeBundles<S>(
    ...bundles: Bundle<S, any>[]
  ): () => Store<S>

  /**
   * Compose application `Bundle`s **without** redux-bundler's built-in
   * middleware.
   */
  export function composeBundlesRaw<S>(
    ...bundles: Bundle<S, any>[]
  ): () => Store<S>

  export type Selector = string | AnyFn

  /**
   * {@link https://reduxbundler.com/api/bundle.html#bundleselectx}
   * {@link https://github.com/HenrikJoreteg/create-selector}
   */
  export function createSelector(...selectors: Selector[]): void

  /**
   * Whether the environment has the `window` global
   */
  export const HAS_WINDOW: boolean

  /**
   * Whether the environment is a browser
   */
  export const IS_BROWSER: boolean

  /**
   * `window.requestAnimationFrame` with a fallback for Node.js
   * {@link https://developer.mozilla.org/en-US/docs/Web/API/window/requestAnimationFrame}
   */
  export function raf(callback: AnyThunk): void

  /**
   * `window.requestIdleCallback` with a fallback for Node.js
   * {@link https://developer.mozilla.org/en-US/docs/Web/API/Window/requestIdleCallback}
   */
  export function ric(callback: AnyThunk, options?: { timeout?: number }): void
}
