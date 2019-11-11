import { JSX, h } from 'preact'
import { connect } from 'redux-bundler-preact'

import { Button } from './Button'

export type CounterOwnProps = JSX.HTMLAttributes<HTMLDivElement>

export interface CounterConnectedProps {
  count: number
  doDecrementCount: (value: number) => any
  doIncrementCount: (value: number) => any
  isMinimum: boolean
}

export const Counter = connect<CounterOwnProps, any, CounterConnectedProps>(
  'doDecrementCount',
  'doIncrementCount',
  'selectCount',
  'selectIsMinimum',
  ({
    count,
    doDecrementCount,
    doIncrementCount,
    isMinimum,
    ...rest
  }: CounterOwnProps & CounterConnectedProps) => (
    <div {...rest}>
      <p class="f3 mb3 mt0">
        Current count: <strong>{count}</strong>
      </p>
      <div class="flex">
        <Button
          aria-label="Decrement"
          disabled={isMinimum}
          onClick={() => doDecrementCount(1)}
          type="button"
        >
          -
        </Button>
        <div class="w1"> </div>
        <Button
          aria-label="Increment"
          onClick={() => doIncrementCount(1)}
          type="button"
        >
          +
        </Button>
      </div>
    </div>
  )
)
