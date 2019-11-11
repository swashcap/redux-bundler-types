import { FunctionComponent, JSX, h } from 'preact'
import clsx from 'clsx'

export type ButtonProps = JSX.HTMLAttributes<HTMLButtonElement>

export const Button: FunctionComponent<ButtonProps> = ({
  class: className,
  disabled,
  ...rest
}) => (
  <button
    class={clsx(
      'bn br1 db dim lh-copy ma0 ph3 pv1 sans-serif white',
      {
        'bg-blue pointer': !disabled,
        'bg-gray': disabled
      },
      className
    )}
    disabled={disabled}
    {...rest}
  />
)
