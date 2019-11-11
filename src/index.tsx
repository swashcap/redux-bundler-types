import { h, render } from 'preact'

const mount = () => {
  const appEl = document.getElementById('app')

  if (appEl) {
    render(<div>Hello, world!</div>, appEl)
  }
}

mount()
