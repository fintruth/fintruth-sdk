import '@storybook/react'

declare module '@storybook/react' {
  export const load: (...args: any[]) => void
}
