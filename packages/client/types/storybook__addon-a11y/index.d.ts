import { StoryDecorator } from '@storybook/react' // eslint-disable-line import/named

declare module '@storybook/addon-a11y' {
  export const withA11Y: StoryDecorator
}
