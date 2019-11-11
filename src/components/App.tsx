import { Component, JSX, h } from 'preact'
import { connect } from 'redux-bundler-preact'
import clsx from 'clsx'

import { Button } from './Button'
import { Counter } from './Counter'

export type AppOwnProps = JSX.HTMLAttributes<HTMLDivElement>

export interface AppConnectedProps {
  doToggleTheme: () => any
  theme: any
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
            {
              'bg-black white': theme.currentTheme === 'dark',
              'bg-white black': theme.currentTheme === 'light'
            },
            className
          )}
          {...rest}
        >
          <div class="center mw8 ph3">
            <header
              class="bb flex items-center justify-between mb3 pv3"
              role="banner"
            >
              <h1 class="f5 fw7 ma0">redux-bundler-types</h1>
              <Button onClick={doToggleTheme} type="button">
                Change theme
              </Button>
            </header>
            <main>
              <Counter />
            </main>
          </div>
        </div>
      )
    }
  }
)
