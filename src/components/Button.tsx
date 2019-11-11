import { FunctionComponent, JSX, h } from 'preact'
import clsx from 'clsx'

export type ButtonProps = JSX.HTMLAttributes<HTMLButtonElement>

export const Button: FunctionComponent<ButtonProps> = ({
  class: className,
  ...rest
}) => (
  <button
    class={clsx(
      'bg-blue bn br1 db dim lh-copy ma0 ph3 pointer pv1 sans-serif white',
      className
    )}
    {...rest}
  />
)
