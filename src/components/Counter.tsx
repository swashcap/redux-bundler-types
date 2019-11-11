import { JSX, h } from 'preact'
import { connect } from 'redux-bundler-preact'

export type CounterOwnProps = JSX.HTMLAttributes<HTMLDivElement>

export interface CounterConnectedProps {
  count: number
  doDecrementCount: (value: number) => any
  doIncrementCount: (value: number) => any
}

export const Counter = connect(
  'doDecrementCount',
  'doIncrementCount',
  'selectCount',
  ({
    count,
    doDecrementCount,
    doIncrementCount,
    ...rest
  }: CounterOwnProps & CounterConnectedProps) => (
    <div {...rest}>
      <p class="f3 mb3 mt0">
        Current count: <strong>{count}</strong>
      </p>
      <button
        aria-label="Decrement"
        class="bg-blue db dim white"
        onClick={() => doDecrementCount(1)}
        type="button"
      >
        -
      </button>
      <button
        aria-label="Increment"
        class="bg-blue db dim white"
        onClick={() => doIncrementCount(1)}
        type="button"
      >
        +
      </button>
    </div>
  )
)
