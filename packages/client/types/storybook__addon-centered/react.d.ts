declare module '@storybook/addon-centered/react' {
  import { DecoratorFunction } from '@storybook/addons'
  import { ReactElement } from 'react'

  const centered: DecoratorFunction<ReactElement>

  export default centered
}
