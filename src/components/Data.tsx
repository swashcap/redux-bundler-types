import { h, JSX } from 'preact'
import { connect } from 'redux-bundler-preact'
import { Button } from './Button'

export type DataOwnProps = JSX.HTMLAttributes<HTMLDivElement>

export interface DataConnectedProps {
  data: any
  doFetchData: () => any
  error: Error | null
  isLoading: boolean
  store: any
}

export const Data = connect(
  'doFetchData',
  'selectData',
  'selectError',
  'selectIsLoading',
  ({
    class: className,
    data,
    doFetchData,
    error,
    isLoading,
    store,
    ...rest
  }: DataOwnProps & DataConnectedProps) => (
    <div {...rest}>
      <h2 class="f3 fw4 mb2 mt0">Fetch Data</h2>
      {isLoading && <span>Loading…</span>}
      {!!error && (
        <div class="bg-light-red black br1 f5 mv2 ph3 pv2">{error.message}</div>
      )}
      {!!data && (
        <pre class="bg-light-gray code f6 lh-solid mv2 ph3 pv2">
          <code>{JSON.stringify(data, null, 2)}</code>
        </pre>
      )}

      {!data && (
        <Button onClick={doFetchData} disabled={isLoading}>
          Load Data
        </Button>
      )}
    </div>
  )
)
