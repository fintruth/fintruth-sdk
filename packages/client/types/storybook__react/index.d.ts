import * as StorybookReact from '@storybook/react'

declare module '@storybook/react' {
  interface Context {
    kind: string
    parameters: StorybookReact.DecoratorParameters
    story: string
  }

  interface Story {
    add(
      storyName: string,
      callback: (
        context: Context
      ) => StorybookReact.Renderable | StorybookReact.Renderable[] | null,
      parameters?: DecoratorParameters
    ): this
    addCentered(
      storyName: string,
      callback: StorybookReact.RenderFunction
    ): this
  }
}
