import { Component, JSX, h } from 'preact'
import { connect } from 'redux-bundler-preact'
import clsx from 'clsx'

import { Counter } from './Counter'

export type AppOwnProps = JSX.HTMLAttributes<HTMLDivElement>

export interface AppConnectedProps {
  doToggleTheme: () => any
  theme: 'light' | 'dark'
}

export const App = connect(
  'doToggleTheme',
  'selectTheme',
  class extends Component<AppOwnProps & AppConnectedProps> {
    render({
      class: className,
      doToggleTheme,
      theme,
      ...rest
    }: AppOwnProps & AppConnectedProps) {
      return (
        <div
          class={clsx(
            'mw8 ph3',
            {
              'bg-black white': theme === 'dark',
              'bg-white black': theme === 'light'
            },
            className
          )}
          {...rest}
        >
          <header class="pv3" role="banner">
            <h1 class="f5 m0">redux-bundler-types</h1>
            <button
              class="bg-blue db dim white"
              onClick={doToggleTheme}
              type="button"
            >
              Change theme
            </button>
          </header>
          <main>
            <Counter />
          </main>
        </div>
      )
    }
  }
)
